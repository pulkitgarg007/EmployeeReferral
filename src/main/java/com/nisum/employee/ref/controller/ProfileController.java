package com.nisum.employee.ref.controller;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFSDBFile;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.service.NotificationService;
import com.nisum.employee.ref.service.ProfileService;

@Controller
public class ProfileController {

	@Autowired
	private ProfileService profileService;
	
	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private MongoConfig mongoConfig;

	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveProfile(@RequestParam(value = "emailId", required = false) String emailId) {
		List<Profile> positionsDetails = null;
		if (emailId != null && !emailId.isEmpty()) {
			positionsDetails = profileService.retrieveCandidateDetails(emailId);
		} else {
			positionsDetails = profileService.retrieveAllProfiles();
		}
		return (null == positionsDetails) ? new ResponseEntity<String>("Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Profile>>(positionsDetails, HttpStatus.OK);
	}

	@RequestMapping(value = "/profile", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> registerUser(@RequestBody Profile candidate) {
		profileService.prepareCandidate(candidate);
		return new ResponseEntity<Profile>(candidate, HttpStatus.OK);
	}

	@RequestMapping(value = "/profile", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> updateUser(@RequestBody Profile candidate) {
		profileService.updateCandidate(candidate);
		return new ResponseEntity<String>("Request Success", HttpStatus.OK);
	}

	@RequestMapping(value = "/profile", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteProfileBasedOnEmailId(
			@RequestParam(value = "emailId", required = true) String emailId) {
		Profile profileDetails = profileService.deleteProfileBasedOnEmailId(emailId);
		return (null == profileDetails) ? new ResponseEntity<String>("profile are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<Profile>(profileDetails, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/sendMail", method = RequestMethod.GET)
	public String sendMail(
			@RequestParam(value="emailId", required = true) String emailId,@RequestParam(value="jobcode", required = true) String jobcode,@RequestParam(value="emailIdInterviewer", required = true) String emailIdInterviewer,@RequestParam(value="cname", required = true) String cname){
		notificationService.sendMail(emailId, jobcode, emailIdInterviewer, cname);
		return "Email Sent Successfully To: " + emailId;
	}

	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
	public ResponseEntity<String> uploadOndemandOrder(HttpServletRequest request, Model model,
			@RequestParam("file") MultipartFile multipartFile) throws Exception {

		InputStream inputStream = null;
		DBObject metaData = new BasicDBObject();
		try {
			GridFsOperations gridOperations = mongoConfig.gridFsTemplate();

			metaData.put("extra1", "anything 1");

			gridOperations.store(multipartFile.getInputStream(), "abc" + multipartFile.getOriginalFilename(),
					multipartFile.getContentType(), metaData);
			// gridOperations.store(multipartFile.getInputStream(), "abc",
			// multipartFile.getContentType(), metaData);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return new ResponseEntity<String>("Succesfully Stored the image", HttpStatus.OK);
	}

	@RequestMapping(value = "/getFile", method = RequestMethod.GET, produces = "application/pdf")
	public ResponseEntity<byte[]> getLocalImage(@PathVariable("fileName") String fileName) {
		byte[] byteResponse = getFile(fileName);

		if (byteResponse != null) {
			return new ResponseEntity<byte[]>(byteResponse, HttpStatus.OK);
		} else
			return new ResponseEntity<byte[]>(HttpStatus.NOT_FOUND);
	}

	public byte[] getFile(String fileName) {
		try {
			GridFsOperations gridOperations = mongoConfig.gridFsTemplate();

			fileName = fileName.concat(".pdf");

			List<GridFSDBFile> files = gridOperations.find(new Query().addCriteria(Criteria.where("metadata.extra1")
					.is("anything 1")));
			for (GridFSDBFile file : files) {
				BufferedImage img = ImageIO.read(file.getInputStream());

				ByteArrayOutputStream bao = new ByteArrayOutputStream();

				ImageIO.write(img, "pdf", bao);

				return bao.toByteArray();

			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
