package com.nisum.employee.ref.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.Position;


@Repository
public class IPositionRepository {
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private MongoOperations mongoOperation;
	
	public void save(Position position) {
		mongoOperation.save(position);
	}
	public void update(Position position) {
		
		Query query = new Query();
		query.addCriteria(Criteria.where("jobcode").is(position.getJobcode()));
		query.fields().include("jobcode");
  
		Update update = new Update();
		update.set("designation",position.getDesignation());
		update.set("experienceRequired",position.getExperienceRequired());
		update.set("primarySkills", position.getPrimarySkills());
		update.set("secondarySkills",position.getSecondarySkills());
		update.set("interviewRounds",position.getInterviewRounds());
		update.set("jobProfile",position.getJobProfile());
		update.set("location",position.getLocation());
		update.set("client",position.getClient());
		mongoOperation.updateFirst(query, update, Position.class);
	}

}
