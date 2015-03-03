package com.nisum.employee.ref.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.IUserInfoRepository;

@Service
public class UserService {
	
	@Autowired//(required=false)
	private IUserInfoRepository userInfoRepository;
	
	public void prepareUserInfo(String data){
		UserInfo userInfo=new UserInfo();
		userInfo.setName(data);
		userInfoRepository.save(userInfo);
	}
}
