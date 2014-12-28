package com.nisum.portal.hr.paf.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.nisum.portal.hr.paf.util.ExceptionHandlerAdviceUtil;

@RunWith(MockitoJUnitRunner.class)
public class SampleControllerTest {

	@InjectMocks
	private SampleController controller;
	
	private MockMvc mockMvc;
	@Before
	public void init() {
		mockMvc = MockMvcBuilders
				.standaloneSetup(controller)
				.setHandlerExceptionResolvers(
						ExceptionHandlerAdviceUtil.createExceptionResolver())
				.build();

	}
	
	@Test
	public void shouldReturnSuccess() throws Exception{
		mockMvc.perform((get("/sample/"))).andExpect(
				status().isOk());
	}
}
