package com.nisum.employee.ref.security.authentication;

import org.springframework.stereotype.Component;

@Component
public class LDAPAutentication implements IAuthentication {

	
	  @Override
	    public void authenticate(String userName, String password) {
	    		        
	        try {	            
	            validateUser(userName, password);
	        } catch (Exception e) {
	            
	           
	        }
	    }
	  
	  private void validateUser(String username, String password) {
	       
	       
	    }

}
