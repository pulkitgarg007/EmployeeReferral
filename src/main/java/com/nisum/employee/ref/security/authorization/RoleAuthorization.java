package com.nisum.employee.ref.security.authorization;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.stereotype.Component;

import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.exception.AuthorizationException;
import com.nisum.employee.ref.repository.UserInfoRepository;

@Component("RoleAuthorization")
public class RoleAuthorization implements IAuthorization {

	// @Setter
	@Autowired
	// (required=false)
	private UserInfoRepository userRepository;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public List<GrantedAuthority> authorize(String userId) {
		String[] parts = userId.split("@");

		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").regex(parts[0]));
		UserInfo user = mongoOperations.findOne(query, UserInfo.class);
		grantedAuthorities.add(new GrantedAuthorityImpl("ROLE_USER"));
		/*if (user != null) {
			String[] userRoles = user.getRoles().split(",");
			for (String userRole : userRoles) {
				grantedAuthorities.add(new GrantedAuthorityImpl("ROLE_" + userRole.toUpperCase()));
			}
		}

		if (grantedAuthorities.isEmpty()) {
			throw new AuthorizationException(
					"User is not authorized to view this page");
		}*/
		return grantedAuthorities;
	}
}
