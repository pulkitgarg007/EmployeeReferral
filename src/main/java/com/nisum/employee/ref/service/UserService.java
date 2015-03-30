package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.UserInfoRepository;

@Service
public class UserService {
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public void registerUser(UserInfo user) {
		userInfoRepository.save(user);
	}
	
	public List<UserInfo> retrieveUser(String name) {
		
		 MongoOperations mongoOperations = (MongoOperations)mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("name").regex(name));
		List<UserInfo> userInfos = mongoOperations.find(query, UserInfo.class);
		
		return userInfos;
	}
}
