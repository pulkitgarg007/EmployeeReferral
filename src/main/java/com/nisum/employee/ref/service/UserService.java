package com.nisum.employee.ref.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.UserInfoRepository;

@Service
public class UserService {
	
	@Autowired//(required=false)
	private UserInfoRepository userInfoRepository;
	
	public void registerUser(UserInfo user) {
		userInfoRepository.save(user);
	}
	
	public UserInfo retrieveUser(String userId) {
		return userInfoRepository.findOne(userId);
	}
}
