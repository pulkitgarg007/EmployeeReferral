package com.nisum.employee.ref.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.SkillsEntity;
import com.nisum.employee.ref.repository.ISkillsRequired;

@Service
public class SkillsService {
	
	@Autowired//(required=false)
	private ISkillsRequired skillsRequired;
	
	public ArrayList<SkillsEntity> retrieveSkills() {
		  ArrayList<SkillsEntity> skills = (ArrayList<SkillsEntity>) skillsRequired.findAll();
		  return skills;
	}

}
