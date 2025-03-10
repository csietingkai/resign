package io.tingkai.resign.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.tingkai.auth.util.ContextUtil;
import io.tingkai.base.log.Loggable;
import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.model.exception.NotExistException;
import io.tingkai.resign.entity.UserSetting;
import io.tingkai.resign.facade.UserSettingFacade;
import lombok.extern.slf4j.Slf4j;

@Service
@Loggable
@Slf4j
public class UserService {

	@Autowired
	private UserSettingFacade userSettingFacade;

	public UserSetting getUserSetting() {
		return this.userSettingFacade.queryByUserId(ContextUtil.getUserId());
	}

	public UserSetting updateUserSetting(UserSetting newSetting) throws FieldMissingException, NotExistException {
		return this.userSettingFacade.update(newSetting);
	}
}
