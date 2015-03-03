package com.nisum.employee.ref.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nisum.employee.ref.service.UserService;

@Controller
public class UserController {

	@Autowired//(required=false)
	private UserService userService;

	@RequestMapping(value="/user", method=RequestMethod.GET)
	public ResponseEntity<String> getUser() {
		userService.prepareUserInfo("User1");
		return new ResponseEntity<String>("Request Success", HttpStatus.OK);
	}

}
