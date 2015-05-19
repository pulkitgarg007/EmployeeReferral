package com.nisum.employee.ref.domain;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Profile")
public class Profile extends AuditEntity{
	String candidateName ;
	@Id
	String emailId;
	String qualification;
	String skills;
	String expYear;
	String expMonth;
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
	String profileModifiedTimeStamp;
	String referredBy;
}
