package com.nisum.employee.ref.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.Candidate;

@Repository
public interface ICandidateRepository extends CrudRepository<Candidate, String> {

}
