package com.nisum.employee.ref.controller;

import java.util.ArrayList;

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

	@RequestMapping(value="/register", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> registerUser(@RequestBody UserInfo user) {
		userService.registerUser(user);
		return new ResponseEntity<String>("User registered Successfully", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/searchUser" , method = RequestMethod.GET)
	public ResponseEntity<?> retrieveUser(@RequestParam(value = "userId", required=true) String userId) {
		final UserInfo user = userService.retrieveUser(userId);
		ArrayList<UserInfo> userList = new ArrayList<UserInfo>();
		userList.add(user);
        return (null == user) ? new ResponseEntity<String>("No user found for the userName "+userId,HttpStatus.NOT_FOUND) : new ResponseEntity<ArrayList<UserInfo>>(userList, HttpStatus.OK);
	}
}
