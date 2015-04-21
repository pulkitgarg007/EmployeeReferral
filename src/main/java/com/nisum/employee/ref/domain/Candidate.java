package com.nisum.employee.ref.domain;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Candidate")
public class Candidate extends AuditEntity{
	String candidateName ;
	@Id
	String emailId;
	String qualification;
	String positionName;
	String skills;
	String experience;
	String uploadedFileName;
	int mobileNo;
	String presentLocation;
	String pancardNo;
	String passportNo;

}
