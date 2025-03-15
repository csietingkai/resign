package io.tingkai.resign.facade;

import java.text.MessageFormat;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.tingkai.base.model.exception.AlreadyExistException;
import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.model.exception.NotExistException;
import io.tingkai.base.util.BaseAppUtil;
import io.tingkai.resign.constant.DatabaseConstant;
import io.tingkai.resign.constant.MessageConstant;
import io.tingkai.resign.dao.UserInfoDao;
import io.tingkai.resign.entity.UserInfo;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserInfoFacade {

	@Autowired
	private UserInfoDao userInfoDao;

	public UserInfo queryByUserName(String userName) {
		Optional<UserInfo> optional = userInfoDao.findByUserName(userName);
		if (optional.isEmpty()) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_USER_INFO));
			return null;
		}
		return optional.get();
	}

	public UserInfo insert(UserInfo entity) throws AlreadyExistException, FieldMissingException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getUserName())) {
			throw new FieldMissingException();
		}

		Optional<UserInfo> optional = userInfoDao.findByUserName(entity.getUserName());
		if (optional.isPresent()) {
			throw new AlreadyExistException();
		}

		return userInfoDao.save(entity);
	}

	public UserInfo update(UserInfo entity) throws FieldMissingException, NotExistException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getId(), entity.getUserName())) {
			throw new FieldMissingException();
		}
		Optional<UserInfo> optional = userInfoDao.findById(entity.getId());
		if (optional.isEmpty()) {
			throw new NotExistException();
		}
		UserInfo updateEntity = optional.get();
		updateEntity.setUserName(entity.getUserName());
		return userInfoDao.save(updateEntity);
	}
}
