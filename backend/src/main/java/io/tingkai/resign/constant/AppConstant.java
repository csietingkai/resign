package io.tingkai.resign.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConstant {

	public static int FETCH_MAX_RECORD;

	@Value("${fetch-max-record}")
	public void setFetchMaxRecord(int fetchMaxRecord) {
		AppConstant.FETCH_MAX_RECORD = fetchMaxRecord;
	}
}
