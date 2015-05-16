package com.nisum.employee.ref.domain;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Candidate")
public class Candidate extends AuditEntity{
	
	@Id
	String emailId;
	String candidateName;
	String qualification;
	String skills;
	String experience;
	String uploadedFileName;
	String mobileNo;
	String pLocation;
	String pancardNo;
	String passportNo;
	String stream;
	String address;
	String notes;
	String altmobileNo;
	String currentEmployer;
	String profilecreatedBy;
	String profileTimeStamp;
	String referredBy;
}
