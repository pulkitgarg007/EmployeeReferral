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
import com.nisum.employee.ref.domain.Position;
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
	
	@RequestMapping(value = "/searchAllPosition", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveAllPositions() {
		List<Position> allPositionsDetails = positionService.retrieveAllPositions();
		return (null == allPositionsDetails) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Position>>(allPositionsDetails, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/searchPositionsBasedOnDesignation", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsBasedOnDegination(@RequestParam(value = "designation", required = true) String designation) {
		List<Position> allPositionsDetails = positionService.retrievePositionsbasedOnDesignation(designation);
		return (null == allPositionsDetails) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Position>>(allPositionsDetails, HttpStatus.OK);
	} 
}
