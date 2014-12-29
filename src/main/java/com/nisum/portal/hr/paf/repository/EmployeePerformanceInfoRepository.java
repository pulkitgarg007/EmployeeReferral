package com.nisum.portal.hr.paf.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nisum.portal.hr.paf.domain.EmployeePerformanceInfo;

@Repository
public interface EmployeePerformanceInfoRepository extends CrudRepository<EmployeePerformanceInfo, String> {

}
