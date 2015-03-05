package com.nisum.employee.ref.repository;

import org.springframework.stereotype.Component;

import com.nisum.employee.ref.domain.UserInfo;


public interface ICustomUserRepository {
	
	public UserInfo retrieveUser(String firstName);

}
