package com.nisum.employee.ref.domain;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Candidate")
public class Candidate extends AuditEntity{
	String name;
	String qualification;
	String experience;
	int age;
	

}
