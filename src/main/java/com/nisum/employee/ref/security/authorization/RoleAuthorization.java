package com.nisum.employee.ref.security.authorization;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.stereotype.Component;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.UserInfoRepository;

@Component("RoleAuthorization")
public class RoleAuthorization implements IAuthorization {
	
	//@Setter
	@Autowired//(required=false)
	private UserInfoRepository userRepository;
	
	@Override
	public List<GrantedAuthority> authorize(String userId) {
		
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		/*if (StringUtils.equals(userId, "employee")) {
		    grantedAuthorities.add(new GrantedAuthorityImpl("ROLE_USER"));
		}*/
		
		UserInfo user = userRepository.findOne(userId);
		 if (user != null) {	        	
			 String role = user.getRole();		        
		      grantedAuthorities.add(new GrantedAuthorityImpl("ROLE_"+role.toUpperCase()));		           
	        }

	       /* if (grantedAuthorities.isEmpty()) {
	           // throw new AuthorizationException("User is not authorized to view this page");
	        }*/
		return grantedAuthorities;
	}
}
