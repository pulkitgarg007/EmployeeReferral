package com.nisum.employee.ref.domain;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Position")
public class Position extends AuditEntity{
	
	@Id
	String jobcode;
	String designation;
	String experienceRequired;
	String primarySkills;
	String secondarySkills;
	int noOfPositions;
	String jobProfile;
	

}
