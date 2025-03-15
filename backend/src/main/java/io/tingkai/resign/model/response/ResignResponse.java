package io.tingkai.resign.model.response;

import io.tingkai.base.model.response.BaseResponse;

public class ResignResponse<T> extends BaseResponse<T> {

	public ResignResponse(boolean success, T t, String pattern) {
		super(success, t, pattern);
	}

	public ResignResponse(boolean success, T t, String pattern, String... params) {
		super(success, t, pattern, params);
	}

	public ResignResponse(Exception e) {
		super(e);
	}

}
