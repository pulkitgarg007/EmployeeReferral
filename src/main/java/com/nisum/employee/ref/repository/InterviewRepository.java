package com.nisum.employee.ref.repository;

import org.springframework.data.repository.CrudRepository;

import com.nisum.employee.ref.domain.InterviewDetails;

public interface InterviewRepository extends CrudRepository<InterviewDetails, String>{

}
