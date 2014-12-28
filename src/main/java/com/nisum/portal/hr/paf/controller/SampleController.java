package com.nisum.portal.hr.paf.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SampleController {
	
	@RequestMapping(value="/sample", method=RequestMethod.GET)
	public ResponseEntity<String> getHelloWorld(){
		
		return new ResponseEntity<String>("Hello World", HttpStatus.OK);
	}

}
