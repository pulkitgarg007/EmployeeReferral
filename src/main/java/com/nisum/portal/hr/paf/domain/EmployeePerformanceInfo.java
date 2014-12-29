package com.nisum.portal.hr.paf.domain;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "EmployeePerformanceInfo")
public class EmployeePerformanceInfo extends AuditEntity{
	
	@Id
	private String name;

}
