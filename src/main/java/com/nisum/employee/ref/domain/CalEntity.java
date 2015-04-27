package com.nisum.employee.ref.domain;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "event")
public class CalEntity {
	String start_date;
	String end_date;
	String text;

}
