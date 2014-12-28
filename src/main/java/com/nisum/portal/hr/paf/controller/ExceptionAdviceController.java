package com.nisum.portal.hr.paf.controller;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.nisum.portal.hr.paf.exception.DataNotFoundException;



@ControllerAdvice
@Slf4j
public class ExceptionAdviceController {
	
	@ExceptionHandler({ DataNotFoundException.class})
    public ResponseEntity<String> handleExternalSystemAndFileNotFoundExceptions(Exception e) {
        log.error(e.getMessage(), e);
        return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
	
	@ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<String> illegalArgumentException(IllegalArgumentException e) {
        log.error(e.getMessage(), e);
        return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
	
	
}
