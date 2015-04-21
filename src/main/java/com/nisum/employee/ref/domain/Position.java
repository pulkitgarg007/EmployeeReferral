package com.nisum.employee.ref.domain;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.sun.xml.internal.bind.v2.schemagen.xmlschema.List;

@Getter
@Setter
@Document(collection = "Position")
public class Position extends AuditEntity{
	
	@Id
	String jobcode;
	String designation;
	String experienceRequired;
	ArrayList<String> primarySkills;
	String secondarySkills;
	int noOfPositions;
	String jobProfile;
	

}
