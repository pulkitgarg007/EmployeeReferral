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
		//return new ResponseEntity<String>("Request Success", HttpStatus.OK);
		return new ResponseEntity<Position>(position, HttpStatus.OK);
	}

	@RequestMapping(value="/position-update", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> updatePosition(@RequestBody Position position) {
		positionService.updatePosition(position);
		return new ResponseEntity<String>("Request Success", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getPosition", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionByClient(@RequestParam(value = "client", required = false) String client) {
		if(client != null)
		{
			List<Position> allPositionsDetails = allPositionsDetails = positionService.retrievePositionByClient(client);
			return (null == allPositionsDetails) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
					: new ResponseEntity<List<Position>>(allPositionsDetails, HttpStatus.OK);
		}
		else
		{
			List<Position> allPositionsDetails = allPositionsDetails = positionService.retrieveAllPositions();
			return (null == allPositionsDetails) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
					: new ResponseEntity<List<Position>>(allPositionsDetails, HttpStatus.OK);
		}
		
	}
	
	@RequestMapping(value = "/searchPositionsBasedOnDesignation", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsBasedOnDegination(@RequestParam(value = "designation", required = true) String designation) {
		List<Position> allPositionsDetails = positionService.retrievePositionsbasedOnDesignation(designation);
		return (null == allPositionsDetails) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<Position>>(allPositionsDetails, HttpStatus.OK);
	} 
	
	@RequestMapping(value = "/searchPositionsBasedOnJobCode", method = RequestMethod.GET)
	public ResponseEntity<?> retrievePositionsBasedOnJobCode(@RequestParam(value = "jobcode", required = true) String jobcode) {
		Position positionsDetail = positionService.retrievePositionsbasedOnJobCode(jobcode);
		return (null == positionsDetail) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<Position>(positionsDetail, HttpStatus.OK);
	} 
	
	@RequestMapping(value = "/deletePositionBasedOnJC", method = RequestMethod.GET)
	public ResponseEntity<?> deletePositionBasedOnJC(@RequestParam(value = "jobcode", required = true) String jobcode) {
		Position positionsDetail = positionService.deletePositionBasedOnJC(jobcode);
		return (null == positionsDetail) ? new ResponseEntity<String>( "Positions are not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<Position>(positionsDetail, HttpStatus.OK);
	} 
}
