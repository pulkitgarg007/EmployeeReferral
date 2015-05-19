package com.nisum.employee.ref.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nisum.employee.ref.domain.InfoEntity;
import com.nisum.employee.ref.service.InfoService;

@Component
@RequestMapping("/skill")
public class InfoController {

	@Autowired
	private InfoService infoService;
	
	@RequestMapping(method = RequestMethod.GET)
	public ArrayList<InfoEntity> retrieveData() {
		final ArrayList<InfoEntity> skills = infoService.retrieveSkills();
		
		//ArrayList<String> skillsList= (ArrayList<String>) skills.get(0).getSkills();
        return skills;
	}
	
	@RequestMapping(value="/skills",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveSkills() {
		
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> skillsList= (ArrayList<String>) skills.get(0).getSkills();
        return (null == skillsList) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(skillsList, HttpStatus.OK);
	}
	@RequestMapping(value="/designations",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveDesignations() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> Designations= (ArrayList<String>) skills.get(0).getDesignations();
        return (null == Designations) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(Designations, HttpStatus.OK);
	}
	@RequestMapping(value="/experience",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveExperience() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> Experience = (ArrayList<String>) skills.get(0).getExperienceRequired();
        return (null == Experience) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(Experience, HttpStatus.OK);
	}
	@RequestMapping(value="/developerskills",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveDeveloperSkills() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> developerSkills = (ArrayList<String>) skills.get(0).getDeveloperSkills();
        return (null == developerSkills) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(developerSkills, HttpStatus.OK);
	}
	@RequestMapping(value="/qeskills",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveQESkills() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> qeskills = (ArrayList<String>) skills.get(0).getQESkills();
        return (null == qeskills) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(qeskills, HttpStatus.OK);
	}
	@RequestMapping(value="/seskills",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveSESkills() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> seskills = (ArrayList<String>) skills.get(0).getSysESkills();
        return (null == seskills) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(seskills, HttpStatus.OK);
	}
	@RequestMapping(value="/location",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveLocation() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> qeskills = (ArrayList<String>) skills.get(0).getLocations();
        return (null == qeskills) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(qeskills, HttpStatus.OK);
	}
	@RequestMapping(value="/position",method = RequestMethod.GET)
	public ResponseEntity<?> retrievePosition() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> position = (ArrayList<String>) skills.get(0).getPositions();
        return (null == position) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(position, HttpStatus.OK);
	}
	@RequestMapping(value="/empPosition",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveempPosition() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> empPosition = (ArrayList<String>) skills.get(0).getEmpPosition();
        return (null == empPosition) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(empPosition, HttpStatus.OK);
	}
	@RequestMapping(value="/qualification",method = RequestMethod.GET)
	public ResponseEntity<?> retrievequalification() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> qualification = (ArrayList<String>) skills.get(0).getQualification();
        return (null == qualification) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(qualification, HttpStatus.OK);
	}
	
	@RequestMapping(value="/plocation",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveplocation() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> plocation = (ArrayList<String>) skills.get(0).getPlocation();
        return (null == plocation) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(plocation, HttpStatus.OK);
	}
	
	@RequestMapping(value="/referredBy",method = RequestMethod.GET)
	public ResponseEntity<?> retrievereferredBy() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> referredBy = (ArrayList<String>) skills.get(0).getReferredBy();
        return (null == referredBy) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(referredBy, HttpStatus.OK);
	}
	
	@RequestMapping(value="/userrole",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveUserRole() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> userRole = (ArrayList<String>) skills.get(0).getUserRoles();
        return (null == userRole) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(userRole, HttpStatus.OK);
	}
	
	@RequestMapping(value="/client",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveClient() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> client = (ArrayList<String>) skills.get(0).getClient();
        return (null == client) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(client, HttpStatus.OK);
	}
	
	@RequestMapping(value="/expYears",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveexpYears() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> expYears = (ArrayList<String>) skills.get(0).getExpYears();
        return (null == expYears) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(expYears, HttpStatus.OK);
	}
	
	@RequestMapping(value="/expMonths",method = RequestMethod.GET)
	public ResponseEntity<?> retrieveexpMonths() {
		ArrayList<InfoEntity> skills = retrieveData();
		ArrayList<String> expMonths = (ArrayList<String>) skills.get(0).getExpMonths();
        return (null == expMonths) ? new ResponseEntity<String>("No skills found for the value ", HttpStatus.NOT_FOUND) : new ResponseEntity <ArrayList<String>>(expMonths, HttpStatus.OK);
	}
}
