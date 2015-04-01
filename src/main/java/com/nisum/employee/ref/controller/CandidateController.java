package com.nisum.employee.ref.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
		candidateService.prepareCandidate(candidate); 
		return new ResponseEntity<String>("Request Success", HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/searchCandidate", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveCandidateDetails(@RequestParam(value = "candidateName", required = true) String candidateName) {
		List<Candidate> candidateDetails = candidateService.retrieveCandidateDetails(candidateName);
		return (null == candidateDetails) ? new ResponseEntity<String>( "Candidate with given argument is not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Candidate>>(candidateDetails, HttpStatus.OK);
	}
}
