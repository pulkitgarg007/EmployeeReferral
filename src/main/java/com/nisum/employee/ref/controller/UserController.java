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

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> registerUser(@RequestBody UserInfo user) {
		userService.registerUser(user);
		return new ResponseEntity<String>("User registered Successfully",
				HttpStatus.OK);
	}

	@RequestMapping(value = "/searchUser", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveUser(
			@RequestParam(value = "name", required = true) String name) {
		List<UserInfo> userInfos = userService.retrieveUser(name);
		return (null == userInfos) ? new ResponseEntity<String>(
				"User with given argument is not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<UserInfo>>(userInfos, HttpStatus.OK);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> updateUser(@RequestBody UserInfo user) {
		System.out.println("inside update user....");
		userService.updateUser(user);
		return new ResponseEntity<String>("User registered Successfully",
				HttpStatus.OK);
	}

	@RequestMapping(value = "/searchUserById", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveUserBy(
			@RequestParam(value = "userId", required = true) String userId) {
		System.out.println("inside searchUserById....");
		List<UserInfo> userInfos = userService.retrieveUserById(userId);
		return (null == userInfos) ? new ResponseEntity<String>(
				"User with given argument is not found", HttpStatus.NOT_FOUND)
				: new ResponseEntity<List<UserInfo>>(userInfos, HttpStatus.OK);
	}
}
