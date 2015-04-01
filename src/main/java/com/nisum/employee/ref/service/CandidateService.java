package com.nisum.employee.ref.service;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Candidate;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.ICandidateRepository;

@Service
public class CandidateService {
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private ICandidateRepository candidateRepository;
	
  public void  prepareCandidate(Candidate candidate){
		candidateRepository.save(candidate);
	}
  
  public List<Candidate> retrieveCandidateDetails(String candidateName) {
		
		 MongoOperations mongoOperations = (MongoOperations)mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("candidateName").regex(Pattern.compile(candidateName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<Candidate> candidateDetails = mongoOperations.find(query, Candidate.class);
		
		return candidateDetails;
	}
}