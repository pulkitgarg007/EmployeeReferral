package com.nisum.employee.ref.domain;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "UserInfo")
public class UserInfo { 
	
	@Id
	private String userId;
	private String name;
	private Integer empId;
	private Integer experience;
	private Integer mobileNumber;
	private String designation;
	private String roles;
	
}
