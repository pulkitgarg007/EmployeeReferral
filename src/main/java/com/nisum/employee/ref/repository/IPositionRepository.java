package com.nisum.employee.ref.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.Candidate;
import com.nisum.employee.ref.domain.Position;

@Repository
public interface IPositionRepository extends CrudRepository<Position, String> {

}
