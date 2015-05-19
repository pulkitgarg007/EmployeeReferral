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

import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.IProfileRepository;

@Service
public class ProfileService {
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private IProfileRepository profileRepository;
	
  public void  prepareCandidate(Profile candidate){
		profileRepository.save(candidate);
	}
  
  public List<Profile> retrieveCandidateDetails(String emailId) {
		
		MongoOperations mongoOperations = (MongoOperations)mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("emailId").regex(Pattern.compile(emailId, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<Profile> candidateDetails = mongoOperations.find(query, Profile.class);
		
		return candidateDetails;
	}
  
  public List<Profile> retrieveAllProfiles() {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		List<Profile> profileDetails = mongoOperations.findAll(Profile.class);
		return profileDetails;
	}
  
  public void  updateCandidate(Profile candidate){
		MongoOperations mongoOperations = (MongoOperations)mongoTemplate;
		Query updateQuery = new Query();
		updateQuery.addCriteria(Criteria.where("emailId").is(candidate.getEmailId()));
		Profile candidate1 = mongoOperations.findOne(updateQuery, Profile.class);
		candidate1.equals(candidate) ;
		Update update = new Update();
		update.set("candidateName", candidate.getCandidateName());
		update.set("qualification", candidate.getQualification());
		update.set("experience", candidate.getExpYear());
		update.set("mobileNo", candidate.getMobileNo());
		update.set("pancardNo", candidate.getPancardNo());
		update.set("passportNo", candidate.getPassportNo());
		update.set("pLocation", candidate.getPLocation());
		update.set("skills", candidate.getSkills());
		
		update.set("stream", candidate.getStream());
		update.set("address", candidate.getAddress());
		update.set("notes", candidate.getNotes());
		update.set("altmobileNo", candidate.getAltmobileNo());
		update.set("currentEmployer", candidate.getCurrentEmployer());
		update.set("profileModifiedTimeStamp", candidate.getProfileModifiedTimeStamp());
		
		
		mongoOperations.updateFirst(updateQuery, update, Profile.class);
	}
  public Profile deleteProfileBasedOnEmailId(String emailId) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").regex(emailId));
		Profile profileDetail = mongoOperations.findOne(query, Profile.class);
		mongoOperations.remove(profileDetail);
		return profileDetail;
	}
}