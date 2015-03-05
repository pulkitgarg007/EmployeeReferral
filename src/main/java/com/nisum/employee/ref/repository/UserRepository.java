package com.nisum.employee.ref.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.nisum.employee.ref.domain.UserInfo;

@Component
public class UserRepository implements ICustomUserRepository  {
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Override
	public UserInfo retrieveUser(String firstName) {
	        
	        UserInfo userInfo = new UserInfo();
	        try {
	            Query query = new Query();
	            query.addCriteria(Criteria.where("firstName").is(firstName));
	            	userInfo = (UserInfo)mongoTemplate.find(query, UserInfo.class);
	            	
	            	System.out.println("inside");
	          //  userInfo = query.get();
	            return userInfo;
	        } catch (Exception ex) {
	        	System.out.println("inside catch");
	            //String errorMsg = "Failed retrieve user information from mongo db." + firstName;
	            
	           // throw new DataAccessException(errorMsg, ex);
	        }
			return userInfo;
	    }

}
