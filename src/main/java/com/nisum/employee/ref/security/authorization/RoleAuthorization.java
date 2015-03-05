package com.nisum.employee.ref.security.authorization;

import java.util.ArrayList;
import java.util.List;

import lombok.Setter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.ICustomUserRepository;
import com.nisum.employee.ref.repository.UserRepository;

@Component("RoleAuthorization")
public class RoleAuthorization implements IAuthorization {
	
	@Setter
	@Autowired
	private ICustomUserRepository userRepository;
	
	@Override
	public List<GrantedAuthority> authorize(String firstName) {
		
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		
		//ICustomUserRepository customUserRepository = new UserRepository();
		UserInfo user = userRepository.retrieveUser(firstName);
		 if (user != null) {
	        	
			 List<String> roles = user.getRoles();
		        if (roles != null) {
		            for (String role : roles) {
		               // grantedAuthorities.add(new GrantedAuthorityImpl(role));
		            }
		        }
	        }

	        if (grantedAuthorities.isEmpty()) {
	           // throw new AuthorizationException("User is not authorized to view this page");
	        }
	        return grantedAuthorities;
	}

}
