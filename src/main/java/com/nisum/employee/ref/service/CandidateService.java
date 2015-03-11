package com.nisum.employee.ref.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Candidate;
import com.nisum.employee.ref.repository.ICandidateRepository;

@Service
public class CandidateService {
	
	
	@Autowired
	private ICandidateRepository candidateRepository;
	
  public void  prepareCandidate(Candidate candidate){
	  enrichCandidate(candidate);
		candidateRepository.save(candidate);
	}
  
  private void enrichCandidate(Candidate candidate)
  {
		candidate.setFirstName(candidate.getFirstName());
		candidate.setLastName(candidate.getLastName());
		candidate.setEmailId(candidate.getEmailId());
		candidate.setQualification(candidate.getQualification());
		candidate.setPositionName(candidate.getPositionName());
		candidate.setSkills(candidate.getSkills());
		candidate.setExperience(candidate.getExperience());
		candidate.setMobileNo(candidate.getMobileNo());
		candidate.setPresentLocation(candidate.getPresentLocation());
		candidate.setPancardNo(candidate.getPancardNo());
		candidate.setPassportNo(candidate.getPassportNo());
  }

}