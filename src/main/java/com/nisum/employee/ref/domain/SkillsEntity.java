package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Skills")
public class SkillsEntity {
	
	List<String> Skills;
	
	//List<String> secondrySkills;

}
