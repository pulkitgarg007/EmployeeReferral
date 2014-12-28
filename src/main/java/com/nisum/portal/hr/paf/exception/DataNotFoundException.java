package com.nisum.portal.hr.paf.exception;
public class DataNotFoundException extends Exception {

	private static final long serialVersionUID = 7676563599007944559L;
	
	String msg;
	
	public DataNotFoundException() { }

	public DataNotFoundException(String msg) {
		super(msg);
		this.msg = msg;
	}

}