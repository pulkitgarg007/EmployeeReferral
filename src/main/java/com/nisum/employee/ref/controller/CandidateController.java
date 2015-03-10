package com.nisum.employee.ref.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.Candidate;
import com.nisum.employee.ref.service.CandidateService;


@Controller
public class CandidateController {

	@Autowired
	private CandidateService  candidateService;
	

	@RequestMapping(value="/candidate-create", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> registerUser(@RequestBody Candidate candidate) {
		//log.info("Creating user with name : {}", candidate.getName());
		candidateService.prepareCandidate(candidate); 
		return new ResponseEntity<String>("Request Success", HttpStatus.OK);
	}
}
