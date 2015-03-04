package com.nisum.employee.ref.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.service.UserService;

@Controller
public class UserController {

	@Autowired//(required=false)
	private UserService userService;

	@RequestMapping(value="/register", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> registerUser(@RequestBody UserInfo user) {
		userService.registerUser(user);
		return new ResponseEntity<String>("User registered Successfully", HttpStatus.OK);
	}

}
