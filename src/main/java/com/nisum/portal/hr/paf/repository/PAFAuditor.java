package com.nisum.portal.hr.paf.repository;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

@Component
public class PAFAuditor implements AuditorAware<String> {
	@Override
	public String getCurrentAuditor() {
		return "nisum_user";
	}
}