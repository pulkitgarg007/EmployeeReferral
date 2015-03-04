package com.nisum.employee.ref.repository;

import org.springframework.data.repository.CrudRepository;

import com.nisum.employee.ref.domain.UserInfo;

public interface IUserInfoRepository extends CrudRepository<UserInfo, String> {

}
