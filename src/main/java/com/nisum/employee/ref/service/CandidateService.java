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
		candidate.setName(candidate.getName());
		candidate.setQualification(candidate.getQualification());
		candidate.setExperience(candidate.getExperience());
		candidate.setAge(candidate.getAge());
  }

}