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
		candidateRepository.save(candidate);
	}
}