package com.nisum.employee.ref.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nisum.employee.ref.domain.SkillsEntity;
import com.nisum.employee.ref.service.SkillsService;

@Component
@RequestMapping("/skill")
public class SkillsController {

	@Autowired
	private SkillsService skillsService;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> retrieveUser() {
		final ArrayList<SkillsEntity> skills = skillsService.retrieveSkills();
		
		ArrayList<String> skillsList= (ArrayList<String>) skills.get(0).getSkills();
        return (null == skillsList) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity<ArrayList<String>>(skillsList, HttpStatus.OK);
	}
}
