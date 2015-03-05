package com.nisum.employee.ref.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "UserInfo")
public class UserInfo { 
	
	private String firstName;
	private String lastName;
	private Integer mobileNumber;
	private Integer exp;
	private String designation;
	private String role;
	private Integer empId;
	private List<String> roles;
	
}
