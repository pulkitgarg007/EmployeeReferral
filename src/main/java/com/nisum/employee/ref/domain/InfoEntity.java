package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Info")
public class InfoEntity {
	
	List<String> Designations;
	List<String> DeveloperSkills;
	List<String> ExperienceRequired;
	List<String> QESkills;
	List<String> SysESkills;
	List<String> Skills;
	List<String> Locations;
	List<String> Positions;
	List<String> UserRoles;
	List<String> Client;
	List<String> empPosition;
	List<String> qualification;
	List<String> plocation;
	List<String> referredBy;
	List<String> expMonths;
	List<String> expYears;
	List<String> InterviewRounds;
}
