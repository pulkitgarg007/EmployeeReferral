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
		UserInfo userInfo=new UserInfo();
		userInfo.setFirstName(user.getFirstName());
		userInfo.setLastName(user.getLastName());
		userInfo.setExp(user.getExp());
		userInfo.setMobileNumber(user.getMobileNumber());
		userInfo.setRole(user.getRole());
		userInfoRepository.save(user);
	}
}
