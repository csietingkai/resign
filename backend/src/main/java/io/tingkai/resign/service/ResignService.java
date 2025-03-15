package io.tingkai.resign.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.tingkai.auth.util.ContextUtil;
import io.tingkai.base.log.Loggable;
import io.tingkai.base.model.exception.AlreadyExistException;
import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.model.exception.NotExistException;
import io.tingkai.base.util.BaseAppUtil;
import io.tingkai.resign.entity.StampCard;
import io.tingkai.resign.entity.UserInfo;
import io.tingkai.resign.facade.StampCardFacade;
import io.tingkai.resign.facade.UserInfoFacade;
import lombok.extern.slf4j.Slf4j;

@Service
@Loggable
@Slf4j
public class ResignService {

	@Autowired
	private UserInfoFacade userInfoFacade;

	@Autowired
	private StampCardFacade stampCardFacade;

	public UserInfo getUserInfo() {
		String userName = ContextUtil.getUserName();
		return userInfoFacade.queryByUserName(userName);
	}

	@Transactional
	public void postInit() throws AlreadyExistException, FieldMissingException, NotExistException {
		String userName = ContextUtil.getUserName();
		UserInfo userInfo = userInfoFacade.queryByUserName(userName);
		if (BaseAppUtil.isEmpty(userInfo)) {
			userInfo = new UserInfo();
			userInfo.setUserName(userName);
			userInfo.setSigned(true);
			userInfo = userInfoFacade.insert(userInfo);
		} else if (!userInfo.getSigned()) {
			userInfo.setSigned(true);
			userInfo = userInfoFacade.update(userInfo);
		}

		StampCard stampCard = stampCardFacade.queryByUserName(userName);
		if (BaseAppUtil.isEmpty(stampCard)) {
			stampCard = new StampCard();
			stampCard.setUserName(userName);
			stampCard.setPoint(0);
			stampCard = stampCardFacade.insert(stampCard);
		}
	}

	public List<StampCard> getLeadingStampCards(int size) {
		return stampCardFacade.queryTop(size);
	}
}