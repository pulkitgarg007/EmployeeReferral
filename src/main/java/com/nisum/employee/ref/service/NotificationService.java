package com.nisum.employee.ref.service;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Profile;

@Service
public class NotificationService {
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	  public String sendMail(String emailId, String jobcode, String emailIdInterviewer, String cname){
			
	      String to = emailId;
	      String toInterviewer = emailIdInterviewer;

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
	         Message msgInterviewer = new MimeMessage(session);

	         // Set From: header field of the header.
	         message.setFrom(new InternetAddress(from));
	         msgInterviewer.setFrom(new InternetAddress(from));

	         // Set To: header field of the header.
	         message.setRecipients(Message.RecipientType.TO,
	         InternetAddress.parse(to));
	         msgInterviewer.setRecipients(Message.RecipientType.TO,
	    	         InternetAddress.parse(toInterviewer));

	         message.setSubject("OSI Technologies");
	         msgInterviewer.setSubject("OSI Technologies - Interview Date");
	         
	         message.setContent("<h2>OSI Recruitment - Your Interview is set!</h2>", "text/html");
	         msgInterviewer.setContent("<h3>Dear " + emailIdInterviewer + ", </h3><br><br>You need to take interview of <b>" + cname + "</b><br><br>Regards,<br>OSI Technologies.", "text/html");
	         
	         Transport.send(message);
	         Transport.send(msgInterviewer);

	      } catch (MessagingException e) {
	            throw new RuntimeException(e);
	      }
	      return "Email Sent Successfully To: " + emailId;
	}
}
