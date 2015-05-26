package com.nisum.employee.ref.domain;

import org.springframework.data.annotation.Id;
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
	String interviewDateTime;
	String typeOfInterview;
	String interviewLocation;
	String emailIdInterviewer;
	String additionalNotes;
	String candidateId;
}
