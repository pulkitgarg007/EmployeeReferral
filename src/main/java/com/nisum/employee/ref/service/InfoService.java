package com.nisum.employee.ref.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.InfoEntity;
import com.nisum.employee.ref.repository.InfoRequired;

@Service
public class InfoService {
	
	@Autowired//(required=false)
	private InfoRequired skillsRequired;
	
	public ArrayList<InfoEntity> retrieveSkills() {
		  ArrayList<InfoEntity> skills = (ArrayList<InfoEntity>) skillsRequired.findAll();
		  return skills;
	}

}
