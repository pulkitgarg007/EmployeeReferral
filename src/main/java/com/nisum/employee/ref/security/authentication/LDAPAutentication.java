package com.nisum.employee.ref.security.authentication;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class LDAPAutentication implements IAuthentication {

	
	  @Override
	    public void authenticate(String userName, String password) {
	    		        
	        try {
	        	if(StringUtils.equals(userName, "employee") && StringUtils.equals(password, "referral"))
	        	{
	        		return;
	        	}
	            
	        } catch (Exception e) {
	            
	           
	        }
	    }
	  
	 
}
