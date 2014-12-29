package com.nisum.portal.hr.paf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.portal.hr.paf.domain.EmployeePerformanceInfo;
import com.nisum.portal.hr.paf.repository.EmployeePerformanceInfoRepository;

@Service
public class SampleService {

	
	@Autowired
	private EmployeePerformanceInfoRepository employeePerformanceInfoRepository;
	
	public void prepareEmployeePerformanceInfo(String data){
		EmployeePerformanceInfo employeePerformanceInfo = new EmployeePerformanceInfo();
		employeePerformanceInfo.setName(data);
		employeePerformanceInfoRepository.save(employeePerformanceInfo);
	}
}
