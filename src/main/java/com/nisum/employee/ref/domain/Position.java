package com.nisum.employee.ref.domain;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Position")
public class Position extends AuditEntity{
	
	String jobcode;
	String postName;
	String experience;
	String skillsRequired;
	int noOfPositions;
	

}
