package com.nisum.employee.ref.domain;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "Interview")
public class InterviewDetails {

	String interviewerName;
	String interviewerMobileNumber;
	String skypeId;
	String interviewDate;
	String typeOfInterview;
}
