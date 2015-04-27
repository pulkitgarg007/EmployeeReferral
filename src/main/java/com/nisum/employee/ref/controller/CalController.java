package com.nisum.employee.ref.controller;

import java.util.*;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.CalEntity;
import com.nisum.employee.ref.service.CalService;

@Controller
@RequestMapping("/data")
public class CalController {

	@RequestMapping(value = "/getSchedules", method = RequestMethod.GET)
	public @ResponseBody
	String getCal() {
		System.out.println("inside CalController::: getCal()");

		List<CalEntity> schedules = calService.retrieveAllSchedule();
		List<Map> list = new ArrayList<Map>();
		
		
		for (CalEntity calEntity : schedules) {
			String start = calEntity.getStart_date();
			String end = calEntity.getEnd_date();
			String title = calEntity.getText();
			Map<String , String> map = new HashMap<String , String>();
			map.put("title", title);
			map.put("start", start);
			map.put("end", end);
			list.add(map);
			
			
			
		}
		
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		try {
			json = mapper.writeValueAsString(list);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return json;
		
	}	
	
	
	@Autowired
	private CalService calService;
	
	
}
