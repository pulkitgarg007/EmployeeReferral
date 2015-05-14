package com.nisum.employee.ref.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

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
import com.nisum.employee.ref.controller.MongoConfig;
import com.nisum.employee.ref.domain.Candidate;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.service.CandidateService;


@Controller
public class CandidateController {

	@Autowired
	private CandidateService  candidateService;
	
	@Autowired
	private MongoConfig mongoConfig;
	

	@RequestMapping(value="/candidate-create", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> registerUser(@RequestBody Candidate candidate) {
		candidateService.prepareCandidate(candidate); 
		//return new ResponseEntity<String>("Request Success", HttpStatus.OK);
		return new ResponseEntity<Candidate>(candidate, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/searchCandidate", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveCandidateDetails(@RequestParam(value = "candidateName", required = true) String candidateName) {
		List<Candidate> candidateDetails = candidateService.retrieveCandidateDetails(candidateName);
		return (null == candidateDetails) ? new ResponseEntity<String>( "Candidate with given argument is not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Candidate>>(candidateDetails, HttpStatus.OK);
	}
	
	@RequestMapping(value="/candidate-update", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> updateUser(@RequestBody Candidate candidate) {
		candidateService.updateCandidate(candidate); 
		return new ResponseEntity<String>("Request Success", HttpStatus.OK);
	}
	@RequestMapping(value = "/deleteProfileBasedOnEmailId", method = RequestMethod.GET)
	public ResponseEntity<?> deleteProfileBasedOnEmailId(@RequestParam(value = "emailId", required = true) String emailId) {
		Candidate profileDetails = candidateService.deleteProfileBasedOnEmailId(emailId);
		return (null == profileDetails) ? new ResponseEntity<String>( "profile are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<Candidate>(profileDetails, HttpStatus.OK);
	} 
	
	
	@ResponseStatus(HttpStatus.OK)
	@RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
	public ResponseEntity<String> uploadOndemandOrder(HttpServletRequest request, Model model, @RequestParam("file") MultipartFile multipartFile) throws Exception {
		
		InputStream inputStream = null;
		DBObject metaData = new BasicDBObject();
		try {
			GridFsOperations gridOperations = mongoConfig.gridFsTemplate();

			metaData.put("extra1", "anything 1");

			gridOperations.store(multipartFile.getInputStream(), "abc" + multipartFile.getOriginalFilename(), multipartFile.getContentType(), metaData);
			//gridOperations.store(multipartFile.getInputStream(), "abc", multipartFile.getContentType(), metaData);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} 
		catch (Exception e){
			e.printStackTrace();
		}
		finally {
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
	public ResponseEntity<byte[]> getLocalImage(@PathVariable("fileName") String fileName)  {
		byte[] byteResponse = getFile(fileName);

		if(byteResponse != null)
		{
			return new ResponseEntity<byte[]>(byteResponse, HttpStatus.OK);
		}
		else
			return new ResponseEntity<byte[]>(HttpStatus.NOT_FOUND);
	}
	
	public byte[] getFile(String fileName)
	{
		try {
			GridFsOperations gridOperations = mongoConfig.gridFsTemplate();

			fileName = fileName.concat(".pdf");

			List<GridFSDBFile> files = gridOperations.find(new Query().addCriteria(Criteria.where(
					"metadata.extra1").is("anything 1")));
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
