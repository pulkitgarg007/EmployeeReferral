package com.nisum.employee.ref.service;

import java.util.List;
import java.util.Properties;
import java.util.regex.Pattern;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.IProfileRepository;

@Service
public class ProfileService {
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private IProfileRepository profileRepository;
	
  public void  prepareCandidate(Profile candidate){
		profileRepository.save(candidate);
	}
  
  public List<Profile> retrieveCandidateDetails(String emailId) {
		
		MongoOperations mongoOperations = (MongoOperations)mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("emailId").regex(Pattern.compile(emailId, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<Profile> candidateDetails = mongoOperations.find(query, Profile.class);
		return candidateDetails;
	}
  
  public List<Profile> retrieveAllProfiles() {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		List<Profile> profileDetails = mongoOperations.findAll(Profile.class);
		return profileDetails;
	}
  
  public void  updateCandidate(Profile candidate){
		MongoOperations mongoOperations = (MongoOperations)mongoTemplate;
		Query updateQuery = new Query();
		updateQuery.addCriteria(Criteria.where("emailId").is(candidate.getEmailId()));
		Profile candidate1 = mongoOperations.findOne(updateQuery, Profile.class);
		candidate1.equals(candidate) ;
		Update update = new Update();
		update.set("candidateName", candidate.getCandidateName());
		update.set("qualification", candidate.getQualification());
		update.set("experience", candidate.getExpYear());
		update.set("mobileNo", candidate.getMobileNo());
		update.set("pancardNo", candidate.getPancardNo());
		update.set("passportNo", candidate.getPassportNo());
		update.set("pLocation", candidate.getPLocation());
		
		update.set("stream", candidate.getStream());
		update.set("address", candidate.getAddress());
		update.set("notes", candidate.getNotes());
		update.set("altmobileNo", candidate.getAltmobileNo());
		update.set("currentEmployer", candidate.getCurrentEmployer());
		update.set("profileModifiedTimeStamp", candidate.getProfileModifiedTimeStamp());
		
		
		mongoOperations.updateFirst(updateQuery, update, Profile.class);
	}
  public Profile deleteProfileBasedOnEmailId(String emailId) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").regex(emailId));
		Profile profileDetail = mongoOperations.findOne(query, Profile.class);
		mongoOperations.remove(profileDetail);
		return profileDetail;
	}
  public String sendMail(String emailId, String jobcode){
		
      String to = emailId;

      String from = "ositechportal@gmail.com";
      final String username = "ositechportal@gmail.com";
      final String password = "123osi123";

      String host = "smtp.gmail.com";

      Properties props = new Properties();
      props.put("mail.smtp.auth", "true");
      props.put("mail.smtp.starttls.enable", "true");
      props.put("mail.smtp.host", host);
      props.put("mail.smtp.port", "587");

      Session session = Session.getInstance(props,
      new javax.mail.Authenticator() {
         protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(username, password);
         }
      });

      try {
         Message message = new MimeMessage(session);

         // Set From: header field of the header.
         message.setFrom(new InternetAddress(from));

         // Set To: header field of the header.
         message.setRecipients(Message.RecipientType.TO,
         InternetAddress.parse(to));

         message.setSubject("OSI Technologies");
         message.setText("OSI Recruitment Portal - Test! - Job Code: " + jobcode);
         Transport.send(message);

         System.out.println("Sent message successfully....");

      } catch (MessagingException e) {
            throw new RuntimeException(e);
      }
      return "Email Sent Successfully To: " + emailId;
}

}