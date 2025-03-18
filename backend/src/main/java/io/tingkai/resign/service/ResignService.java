package io.tingkai.resign.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.tingkai.auth.util.ContextUtil;
import io.tingkai.base.log.Loggable;
import io.tingkai.base.model.exception.AlreadyExistException;
import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.model.exception.NotExistException;
import io.tingkai.base.util.BaseAppUtil;
import io.tingkai.base.util.BaseStringUtil;
import io.tingkai.resign.entity.Coworker;
import io.tingkai.resign.entity.StampCard;
import io.tingkai.resign.entity.StampCardRecord;
import io.tingkai.resign.entity.UserInfo;
import io.tingkai.resign.facade.CoworkerFacade;
import io.tingkai.resign.facade.StampCardFacade;
import io.tingkai.resign.facade.StampCardRecordFacade;
import io.tingkai.resign.facade.UserInfoFacade;
import io.tingkai.resign.model.vo.DeptCoworkerInfo;
import io.tingkai.resign.model.vo.StampCardInfo;
import io.tingkai.resign.model.vo.StampCardInfo.ExtraInfo;
import lombok.extern.slf4j.Slf4j;

@Service
@Loggable
@Slf4j
public class ResignService {

	@Autowired
	private UserInfoFacade userInfoFacade;

	@Autowired
	private StampCardFacade stampCardFacade;

	@Autowired
	private StampCardRecordFacade stampCardRecordFacade;

	@Autowired
	private CoworkerFacade coworkerFacade;

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

	public StampCardInfo getStampCardInfo() {
		StampCard stampCard = stampCardFacade.queryByUserName(ContextUtil.getUserName());
		StampCardInfo info = new StampCardInfo();
		info.transform(stampCard);
		List<StampCardRecord> records = stampCardRecordFacade.queryByCardId(stampCard.getId());
		List<ExtraInfo> extraInfos = new ArrayList<ExtraInfo>();
		records.forEach(r -> {
			for (int i = 0; i < r.getPoint(); i++) {
				ExtraInfo extraInfo = new ExtraInfo();
				extraInfo.setRecordId(r.getId());
				extraInfo.setRecordDate(DateTimeFormatter.ofPattern("MM/dd").format(r.getDate()));
				extraInfos.add(extraInfo);
			}
		});
		info.setExtraInfos(extraInfos);
		return info;
	}

	public StampCardRecord fetchStampCardRecord(UUID id) {
		return stampCardRecordFacade.queryById(id);
	}

	@Transactional
	public void insertStampCardRecord(StampCardRecord stampCardRecord) throws FieldMissingException, NotExistException {
		StampCard stampCard = stampCardFacade.queryById(stampCardRecord.getCardId());
		stampCard.setPoint(stampCard.getPoint() + stampCardRecord.getPoint());
		stampCard = stampCardFacade.update(stampCard);

		stampCardRecord = stampCardRecordFacade.insert(stampCardRecord);
	}

	@Transactional
	public void removeStampCardRecord(UUID recordId) {
		stampCardRecordFacade.remove(recordId);
	}

	public List<StampCardRecord> fetchStampCardRecords(@Nullable LocalDate startDate, @Nullable LocalDate endDate, @Nullable String dept, @Nullable UUID coworkerId) {
		List<StampCardRecord> stampCardRecords = stampCardRecordFacade.queryByDateAndcoWorkerId(startDate, endDate, coworkerId);
		if (BaseStringUtil.isBlank(dept)) {
			return stampCardRecords;
		}
		List<Coworker> coworkers = coworkerFacade.queryAll();
		Map<UUID, String> belongToDept = new HashMap<UUID, String>();
		for (Coworker coworker : coworkers) {
			belongToDept.put(coworker.getId(), coworker.getDept());
		}
		stampCardRecords = stampCardRecords.stream().filter(x -> BaseStringUtil.equals(belongToDept.get(x.getCoworkerId()), dept)).collect(Collectors.toList());
		return stampCardRecords;
	}

	public List<DeptCoworkerInfo> getCoworkerOptions() {
		List<String> depts = coworkerFacade.queryAllDept();
		List<Coworker> coworkers = coworkerFacade.queryAll();

		List<DeptCoworkerInfo> infos = new ArrayList<DeptCoworkerInfo>();
		for (String dept : depts) {
			DeptCoworkerInfo info = new DeptCoworkerInfo();
			info.setDept(dept);
			info.setCoworkers(new ArrayList<Coworker>());
			for (Coworker coworker : coworkers) {
				if (BaseStringUtil.equals(dept, coworker.getDept())) {
					info.getCoworkers().add(coworker);
				}
			}
			infos.add(info);
		}
		infos.sort((a, b) -> a.getDept().compareTo(b.getDept()));
		return infos;
	}

	public List<StampCard> getLeadingStampCards(int size) {
		return stampCardFacade.queryTop(size);
	}


}