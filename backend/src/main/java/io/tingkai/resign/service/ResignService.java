package io.tingkai.resign.service;

import java.time.LocalDate;
import java.util.ArrayList;
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
import io.tingkai.resign.entity.Coworker;
import io.tingkai.resign.entity.Organization;
import io.tingkai.resign.entity.StampCard;
import io.tingkai.resign.entity.StampCardRecord;
import io.tingkai.resign.entity.UserInfo;
import io.tingkai.resign.facade.CoworkerFacade;
import io.tingkai.resign.facade.OrganizationFacade;
import io.tingkai.resign.facade.StampCardFacade;
import io.tingkai.resign.facade.StampCardRecordFacade;
import io.tingkai.resign.facade.UserInfoFacade;
import io.tingkai.resign.model.request.UpdateUserSettingReq;
import io.tingkai.resign.model.vo.CoworkerVo;
import io.tingkai.resign.model.vo.OrganizationCoworkerInfo;
import io.tingkai.resign.model.vo.OrganizationVo;
import io.tingkai.resign.model.vo.StampCardRecordVo;
import lombok.extern.slf4j.Slf4j;

@Service
@Loggable
@Slf4j
public class ResignService {

	@Autowired
	private UserInfoFacade userInfoFacade;

	@Autowired
	private OrganizationFacade organizationFacade;

	@Autowired
	private CoworkerFacade coworkerFacade;

	@Autowired
	private StampCardFacade stampCardFacade;

	@Autowired
	private StampCardRecordFacade stampCardRecordFacade;

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

	public void updateUserInfo(UpdateUserSettingReq req) throws FieldMissingException, NotExistException {
		UserInfo userInfo = userInfoFacade.queryByUserName(ContextUtil.getUserName());
		userInfo.setMaxStampCnt(req.getMaxStampCnt());
		userInfoFacade.update(userInfo);
	}

	public StampCard getStampCard() {
		return stampCardFacade.queryByUserName(ContextUtil.getUserName());
	}

	public List<OrganizationVo> getOrganizations() {
		List<Organization> orgs = organizationFacade.queryAll();
		List<OrganizationVo> vos = new ArrayList<>();
		orgs.forEach(o -> {
			OrganizationVo vo = new OrganizationVo();
			vo.transform(o);
			List<Coworker> coworkers = coworkerFacade.queryByOrganizationId(o.getId());
			vo.setDeletable(coworkers.size() == 0);
			vos.add(vo);
		});
		return vos;
	}

	public Organization getOrganization(UUID organizationId) {
		return organizationFacade.queryById(organizationId);
	}

	public void insertOrganization(Organization entity) throws FieldMissingException {
		organizationFacade.insert(entity);
	}

	public void updateOrganization(Organization entity) throws FieldMissingException, NotExistException {
		organizationFacade.update(entity);
	}

	public void removeOrganization(UUID organizationId) {
		organizationFacade.remove(organizationId);
	}

	public List<CoworkerVo> getCoworkers(UUID organizationId) {
		List<Coworker> coworkers = coworkerFacade.queryByOrganizationId(organizationId);
		List<CoworkerVo> vos = new ArrayList<>();
		coworkers.forEach(c -> {
			CoworkerVo vo = new CoworkerVo();
			vo.transform(c);
			vo.setDeletable(stampCardRecordFacade.queryByCoworkerId(c.getId()).size() == 0);
			vos.add(vo);
		});
		return vos;
	}

	public Coworker getCoworker(UUID coworkerId) {
		return coworkerFacade.queryById(coworkerId);
	}

	public void insertCoworker(Coworker entity) throws FieldMissingException {
		coworkerFacade.insert(entity);
	}

	public void updateCoworker(Coworker entity) throws FieldMissingException, NotExistException {
		coworkerFacade.update(entity);
	}

	public void removeCoworker(UUID organizationId) {
		coworkerFacade.remove(organizationId);
	}

	public List<OrganizationCoworkerInfo> getOrgWorkerOptions() {
		List<Organization> orgs = organizationFacade.queryAll();
		Map<UUID, List<Coworker>> coworkers = coworkerFacade.queryAll().stream().collect(Collectors.groupingBy(Coworker::getOrganizationId));
		return orgs.stream().map(x -> {
			OrganizationCoworkerInfo info = new OrganizationCoworkerInfo();
			info.setOrgId(x.getId());
			info.setOrgName(x.getName());
			info.setCoworkers(coworkers.getOrDefault(x.getId(), new ArrayList<>()));
			return info;
		}).collect(Collectors.toList());
	}

	public List<StampCardRecordVo> getStampCardRecords(@Nullable LocalDate startDate, @Nullable LocalDate endDate, @Nullable UUID coworkerId) {
		StampCard stampCard = stampCardFacade.queryByUserName(ContextUtil.getUserName());
		List<StampCardRecord> records = stampCardRecordFacade.queryByDateAndCoworkerId(stampCard.getId(), startDate, endDate, coworkerId);
		List<StampCardRecordVo> vos = new ArrayList<>();
		records.forEach(r -> {
			StampCardRecordVo vo = new StampCardRecordVo();
			vo.transform(r);
			Coworker coworker = coworkerFacade.queryById(r.getCoworkerId());
			vo.setOrganizationId(coworker.getOrganizationId());
			vo.setCoworkerName(coworker.getName());
			Organization org = organizationFacade.queryById(coworker.getOrganizationId());
			vo.setOrganizationName(org.getName());
			vos.add(vo);
		});
		return vos;
	}

	public StampCardRecordVo getStampCardRecord(UUID recordId) {
		StampCardRecordVo vo = new StampCardRecordVo();
		StampCardRecord stamCardRecord = stampCardRecordFacade.queryById(recordId);
		vo.transform(stamCardRecord);
		Coworker coworker = coworkerFacade.queryById(stamCardRecord.getCoworkerId());
		vo.setOrganizationId(coworker.getOrganizationId());
		vo.setCoworkerName(coworker.getName());
		Organization org = organizationFacade.queryById(coworker.getOrganizationId());
		vo.setOrganizationName(org.getName());
		return vo;
	}

	@Transactional
	public void insertStampCardRecord(StampCardRecord stampCardRecord) throws FieldMissingException, NotExistException {
		StampCard stampCard = stampCardFacade.queryById(stampCardRecord.getCardId());
		stampCard.setPoint(stampCard.getPoint() + stampCardRecord.getPoint());
		stampCard = stampCardFacade.update(stampCard);

		stampCardRecord = stampCardRecordFacade.insert(stampCardRecord);
	}

	@Transactional
	public void updateStampCardRecord(StampCardRecord updateStampCardRecord) throws FieldMissingException, NotExistException {
		StampCardRecord origStampCardRecord = stampCardRecordFacade.queryById(updateStampCardRecord.getId());

		StampCard stampCard = stampCardFacade.queryById(updateStampCardRecord.getCardId());
		stampCard.setPoint(stampCard.getPoint() + updateStampCardRecord.getPoint() - origStampCardRecord.getPoint());
		stampCard = stampCardFacade.update(stampCard);

		updateStampCardRecord = stampCardRecordFacade.update(updateStampCardRecord);
	}

	@Transactional
	public void removeStampCardRecord(UUID recordId) throws FieldMissingException, NotExistException {
		StampCardRecord stampCardRecord = stampCardRecordFacade.queryById(recordId);
		StampCard stampCard = stampCardFacade.queryById(stampCardRecord.getCardId());
		stampCard.setPoint(stampCard.getPoint() - stampCardRecord.getPoint());
		stampCard = stampCardFacade.update(stampCard);
		stampCardRecordFacade.remove(recordId);
	}
}