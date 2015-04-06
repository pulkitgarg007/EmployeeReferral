package com.nisum.employee.ref.service;

import java.util.List;
import java.util.regex.Pattern;

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

		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("name").regex(Pattern.compile(name, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<UserInfo> userInfos = mongoOperations.find(query, UserInfo.class);

		return userInfos;
	}

	public void updateUser(UserInfo user) {

		UserInfo userInfo = userInfoRepository.findOne(user.getUserId());
		userInfo.setRoles(user.getRoles());
		userInfo.setName(user.getName());
		userInfo.setMobileNumber(user.getMobileNumber());
		userInfo.setExperience(user.getExperience());
		userInfo.setEmpId(user.getEmpId());
		userInfo.setDesignation(user.getDesignation());
		userInfoRepository.save(userInfo);

	}

	public List<UserInfo> retrieveUserById(String userId) {

		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("userId").regex(userId));
		List<UserInfo> userInfos = mongoOperations.find(query, UserInfo.class);

		return userInfos;
	}
}
