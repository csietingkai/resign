package io.tingkai.resign.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.base.model.exception.AlreadyExistException;
import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.model.exception.NotExistException;
import io.tingkai.base.model.response.BaseResponse;
import io.tingkai.base.model.response.SimpleResponse;
import io.tingkai.resign.constant.MessageConstant;
import io.tingkai.resign.entity.Coworker;
import io.tingkai.resign.entity.Organization;
import io.tingkai.resign.entity.StampCard;
import io.tingkai.resign.entity.UserInfo;
import io.tingkai.resign.model.request.InsertStampCardRecordRequest;
import io.tingkai.resign.model.request.UpdateStampCardRecordRequest;
import io.tingkai.resign.model.request.UpdateUserSettingReq;
import io.tingkai.resign.model.vo.CoworkerVo;
import io.tingkai.resign.model.vo.LeaderboardVo;
import io.tingkai.resign.model.vo.OrganizationCoworkerInfo;
import io.tingkai.resign.model.vo.OrganizationVo;
import io.tingkai.resign.model.vo.StampCardRecordVo;
import io.tingkai.resign.service.ResignService;

@RestController
@RequestMapping(value = ResignController.CONROLLER_PREFIX)
public class ResignController {

	public static final String CONROLLER_PREFIX = "/resign";
	public static final String USER_INFO_PATH = "/userInfo";
	public static final String POST_INIT_PATH = "/postInit";
	public static final String STAMP_CARD_PATH = "/stampCard";
	public static final String STAMP_CARD_RECORD_PATH = "/stampCardRecord";
	public static final String STAMP_CARD_RECORDS_PATH = "/stampCardRecords";
	public static final String ORGANIZATIONS_PATH = "/organizations";
	public static final String ORGANIZATION_PATH = "/organization";
	public static final String COWORKERS_PATH = "/coworkers";
	public static final String COWORKER_PATH = "/coworker";
	public static final String ORG_COWORKER_PATH = "/orgcoworkers";
	public static final String LEADERBOARD_PAYH = "/leaderboard";

	@Autowired
	private ResignService resignService;

	@RequestMapping(value = ResignController.USER_INFO_PATH, method = RequestMethod.GET)
	public BaseResponse<UserInfo> getUserInfo() {
		UserInfo userInfo = resignService.getUserInfo();
		return new BaseResponse<UserInfo>(true, userInfo, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.POST_INIT_PATH, method = RequestMethod.POST)
	public SimpleResponse postInit() throws AlreadyExistException, FieldMissingException, NotExistException {
		resignService.postInit();
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.USER_INFO_PATH, method = RequestMethod.POST)
	public SimpleResponse updateUserInfo(@RequestBody UpdateUserSettingReq req) throws FieldMissingException, NotExistException {
		resignService.updateUserInfo(req);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.STAMP_CARD_PATH, method = RequestMethod.GET)
	public BaseResponse<StampCard> getStampCard() throws FieldMissingException, NotExistException {
		StampCard stampCard = resignService.getStampCard();
		return new BaseResponse<StampCard>(true, stampCard, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.ORG_COWORKER_PATH, method = RequestMethod.GET)
	public BaseResponse<List<OrganizationCoworkerInfo>> getOrgWorkerOptions() {
		List<OrganizationCoworkerInfo> infos = resignService.getOrgWorkerOptions();
		return new BaseResponse<List<OrganizationCoworkerInfo>>(true, infos, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.STAMP_CARD_RECORD_PATH, method = RequestMethod.GET)
	public BaseResponse<StampCardRecordVo> getStampCardRecord(@RequestParam UUID recordId) throws FieldMissingException, NotExistException {
		StampCardRecordVo stampCardRecord = resignService.getStampCardRecord(recordId);
		return new BaseResponse<StampCardRecordVo>(true, stampCardRecord, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.ORGANIZATIONS_PATH, method = RequestMethod.GET)
	public BaseResponse<List<OrganizationVo>> getOrganizations() {
		List<OrganizationVo> orgs = resignService.getOrganizations();
		return new BaseResponse<List<OrganizationVo>>(true, orgs, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.ORGANIZATION_PATH, method = RequestMethod.GET)
	public BaseResponse<Organization> getOrganization(@RequestParam UUID organizationId) {
		Organization org = resignService.getOrganization(organizationId);
		return new BaseResponse<Organization>(true, org, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.ORGANIZATION_PATH, method = RequestMethod.POST)
	public SimpleResponse insertOrganization(@RequestBody Organization entity) throws FieldMissingException, NotExistException {
		resignService.insertOrganization(entity);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.ORGANIZATION_PATH, method = RequestMethod.PATCH)
	public SimpleResponse updateOrganization(@RequestBody Organization entity) throws FieldMissingException, NotExistException {
		resignService.updateOrganization(entity);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.ORGANIZATION_PATH, method = RequestMethod.DELETE)
	public SimpleResponse removeOrganization(@RequestParam UUID organizationId) throws FieldMissingException, NotExistException {
		resignService.removeOrganization(organizationId);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.COWORKERS_PATH, method = RequestMethod.GET)
	public BaseResponse<List<CoworkerVo>> getCoworkers(@RequestParam UUID organizationId) {
		List<CoworkerVo> coworkers = resignService.getCoworkers(organizationId);
		return new BaseResponse<List<CoworkerVo>>(true, coworkers, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.COWORKER_PATH, method = RequestMethod.GET)
	public BaseResponse<Coworker> getCoworker(@RequestParam UUID coworkerId) {
		Coworker org = resignService.getCoworker(coworkerId);
		return new BaseResponse<Coworker>(true, org, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.COWORKER_PATH, method = RequestMethod.POST)
	public SimpleResponse insertCoworker(@RequestBody Coworker entity) throws FieldMissingException, NotExistException {
		resignService.insertCoworker(entity);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.COWORKER_PATH, method = RequestMethod.PATCH)
	public SimpleResponse updateCoworker(@RequestBody Coworker entity) throws FieldMissingException, NotExistException {
		resignService.updateCoworker(entity);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.COWORKER_PATH, method = RequestMethod.DELETE)
	public SimpleResponse removeCoworker(@RequestParam UUID coworkerId) throws FieldMissingException, NotExistException {
		resignService.removeCoworker(coworkerId);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.STAMP_CARD_RECORDS_PATH, method = RequestMethod.GET)
	public BaseResponse<List<StampCardRecordVo>> fetchStampCardRecords(@RequestParam(required = false) LocalDate startDate, @RequestParam(required = false) LocalDate endDate, @RequestParam(required = false) UUID coworkerId) throws FieldMissingException, NotExistException {
		List<StampCardRecordVo> stampCardRecords = resignService.getStampCardRecords(startDate, endDate, coworkerId);
		return new BaseResponse<List<StampCardRecordVo>>(true, stampCardRecords, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.STAMP_CARD_RECORD_PATH, method = RequestMethod.POST)
	public SimpleResponse insertStampCardRecord(@RequestBody InsertStampCardRecordRequest stampCardRecord) throws FieldMissingException, NotExistException {
		resignService.insertStampCardRecord(stampCardRecord.toEntity());
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.STAMP_CARD_RECORD_PATH, method = RequestMethod.PATCH)
	public SimpleResponse updateStampCardRecord(@RequestBody UpdateStampCardRecordRequest stampCardRecord) throws FieldMissingException, NotExistException {
		resignService.updateStampCardRecord(stampCardRecord.toEntity());
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.STAMP_CARD_RECORD_PATH, method = RequestMethod.DELETE)
	public SimpleResponse removeStampCardRecord(@RequestParam UUID recordId) throws FieldMissingException, NotExistException {
		resignService.removeStampCardRecord(recordId);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.LEADERBOARD_PAYH, method = RequestMethod.GET)
	public BaseResponse<LeaderboardVo> getLeaderboard(@RequestParam(defaultValue = "10") int cnt) throws FieldMissingException, NotExistException {
		LeaderboardVo vo = resignService.getLeaderboard(cnt);
		return new BaseResponse<LeaderboardVo>(true, vo, MessageConstant.SUCCESS);
	}
}