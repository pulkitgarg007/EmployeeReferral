package com.nisum.employee.ref.service;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Candidate;
import com.nisum.employee.ref.domain.Position;
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
  
  public void  updateCandidate(Candidate candidate){
		MongoOperations mongoOperations = (MongoOperations)mongoTemplate;
		Query updateQuery = new Query();
		updateQuery.addCriteria(Criteria.where("emailId").is(candidate.getEmailId()));
		Candidate candidate1 = mongoOperations.findOne(updateQuery, Candidate.class);
		candidate1.equals(candidate) ;
		Update update = new Update();
		update.set("candidateName", candidate.getCandidateName());
		update.set("qualification", candidate.getQualification());
		update.set("experience", candidate.getExperience());
		update.set("mobileNo", candidate.getMobileNo());
		update.set("pancardNo", candidate.getPancardNo());
		update.set("passportNo", candidate.getPassportNo());
		update.set("positionName", candidate.getPositionName());
		update.set("presentLocation", candidate.getPresentLocation());
		update.set("skills", candidate.getSkills());
		mongoOperations.updateFirst(updateQuery, update, Candidate.class);
	}
  public Candidate deleteProfileBasedOnEmailId(String emailId) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").regex(emailId));
		Candidate profileDetail = mongoOperations.findOne(query, Candidate.class);
		mongoOperations.remove(profileDetail);
		return profileDetail;
	}
}