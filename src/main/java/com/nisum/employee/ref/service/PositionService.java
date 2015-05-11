package com.nisum.employee.ref.service;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.repository.IPositionRepository;


@Service
public class PositionService {

	@Autowired
	private IPositionRepository positionRepository;

	@Autowired
	private MongoTemplate mongoTemplate;

	public void preparePosition(Position position) {
		positionRepository.save(position);
	}
	
	public void updatePosition(Position position) {
		positionRepository.update(position);
	}

	public List<Position> retrievePositionByClient(String client) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("client").regex(Pattern.compile(client, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<Position> positionDatails = mongoOperations.find(query, Position.class);
		return positionDatails;
	}
	
	public List<Position> retrieveAllPositions() {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		List<Position> positionDatails = mongoOperations.findAll(Position.class);
		return positionDatails;
	}

	public List<Position> retrievePositionsbasedOnDesignation(String designation) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("designation").regex(Pattern.compile(designation, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<Position> positionDatails = mongoOperations.find(query, Position.class);
		return positionDatails;
	}
	
	public Position retrievePositionsbasedOnJobCode(String jobcode) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").regex(jobcode));
		Position positionDetail = mongoOperations.findOne(query, Position.class);
		return positionDetail;
	}
	
	public Position deletePositionBasedOnJC(String jobcode) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").regex(jobcode));
		Position positionDetail = mongoOperations.findOne(query, Position.class);
		mongoOperations.remove(positionDetail);
		return positionDetail;
	}
	
}