package com.nisum.employee.ref.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nisum.employee.ref.domain.UserInfo;

@Repository
public interface UserInfoRepository extends CrudRepository<UserInfo, String> {
	


}
