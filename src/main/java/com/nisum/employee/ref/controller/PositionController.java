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
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.service.CandidateService;
import com.nisum.employee.ref.service.PositionService;


@Controller
public class PositionController {

	@Autowired
	private PositionService  positionService;
	
	@RequestMapping(value="/position-create", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createPosition(@RequestBody Position position) {
		positionService.preparePosition(position);
		return new ResponseEntity<String>("Request Success", HttpStatus.OK);
	}
}
