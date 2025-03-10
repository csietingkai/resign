package io.tingkai.resign.facade;

import java.text.MessageFormat;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.tingkai.base.model.exception.AlreadyExistException;
import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.model.exception.NotExistException;
import io.tingkai.base.util.BaseAppUtil;
import io.tingkai.resign.constant.DatabaseConstant;
import io.tingkai.resign.constant.MessageConstant;
import io.tingkai.resign.dao.UserSettingDao;
import io.tingkai.resign.entity.UserSetting;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserSettingFacade {

	@Autowired
	private UserSettingDao userSettingDao;

	public UserSetting query(UUID id) {
		Optional<UserSetting> optional = this.userSettingDao.findById(id);
		if (optional.isEmpty()) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_USER_SETTING));
		}
		return optional.get();
	}

	public UserSetting queryByUserId(UUID userId) {
		Optional<UserSetting> optional = this.userSettingDao.findByUserId(userId);
		if (optional.isEmpty()) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_USER_SETTING));
		}
		return optional.get();
	}

	public UserSetting insert(UserSetting entity) throws AlreadyExistException, FieldMissingException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getUserId(), entity.getPwdChanged())) {
			throw new FieldMissingException();
		}
		Optional<UserSetting> optional = this.userSettingDao.findByUserId(entity.getUserId());
		if (optional.isPresent()) {
			throw new AlreadyExistException();
		}
		return this.userSettingDao.save(entity);
	}

	public UserSetting update(UserSetting entity) throws FieldMissingException, NotExistException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getId(), entity.getUserId(), entity.getPwdChanged())) {
			throw new FieldMissingException();
		}
		Optional<UserSetting> optional = this.userSettingDao.findById(entity.getId());
		if (!optional.isPresent()) {
			throw new NotExistException();
		}
		return this.userSettingDao.save(entity);
	}
}
