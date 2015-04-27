package com.nisum.employee.ref.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.CalEntity;
import com.nisum.employee.ref.repository.UserInfoRepository;
@Service
public class CalService {
	
	@Autowired
	private UserInfoRepository userInfoRepository;

	@Autowired
	private MongoTemplate mongoTemplate;
	
	public List<CalEntity> retrieveAllSchedule() {
		System.out.println("inside calservice::: retrieveAllSchedule");

		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		List<CalEntity> schedules = mongoOperations.findAll(CalEntity.class);
		return schedules;
	}

	
}
