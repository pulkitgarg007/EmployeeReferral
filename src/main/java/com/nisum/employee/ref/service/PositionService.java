package com.nisum.employee.ref.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Candidate;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.repository.ICandidateRepository;
import com.nisum.employee.ref.repository.IPositionRepository;

@Service
public class PositionService {
	
	
	@Autowired
	private IPositionRepository positionRepository;
	
  public void  preparePosition(Position position){
	  enrichPosition(position);
		positionRepository.save(position);
	}
  
  private void enrichPosition(Position position)
  {
	   position.setJobcode(position.getJobcode());
	   position.setPostName(position.getPostName());
	   position.setExperience(position.getExperience());
	   position.setSkillsRequired(position.getSkillsRequired());
	   position.setNoOfPositions(position.getNoOfPositions());
		
  }

}