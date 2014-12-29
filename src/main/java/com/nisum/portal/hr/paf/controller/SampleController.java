package com.nisum.portal.hr.paf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nisum.portal.hr.paf.service.SampleService;

@Controller
public class SampleController {
	
	@Autowired
	private SampleService  service;
	
	@RequestMapping(value="/sample", method=RequestMethod.GET)
	public ResponseEntity<String> getHelloWorld(){
		service.prepareEmployeePerformanceInfo("some employee");
		return new ResponseEntity<String>("Request Success", HttpStatus.OK);
	}

}
