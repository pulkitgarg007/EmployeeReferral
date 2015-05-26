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

import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.service.InterviewService;
import com.nisum.employee.ref.service.PositionService;

@Controller
public class InterviewController {
	
	@Autowired
	private InterviewService  interviewService;
	
	@RequestMapping(value="/interview-create", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createInterview(@RequestBody InterviewDetails interview) {
		interviewService.prepareInterview(interview);
		return new ResponseEntity<InterviewDetails>(interview, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/interview-check", method = RequestMethod.GET)
	public ResponseEntity<?> interviewCheck(@RequestParam(value = "candidateId", required = true) String candidateId) {
		List<InterviewDetails> checkDetails = interviewService.interviewCheck(candidateId);
		return (null == checkDetails) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<InterviewDetails>>(checkDetails, HttpStatus.OK);
	} 

}
