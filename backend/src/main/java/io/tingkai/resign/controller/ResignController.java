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
import io.tingkai.base.model.response.SimpleResponse;
import io.tingkai.resign.constant.MessageConstant;
import io.tingkai.resign.entity.StampCard;
import io.tingkai.resign.entity.StampCardRecord;
import io.tingkai.resign.entity.UserInfo;
import io.tingkai.resign.model.request.InsertStampCardRecordRequest;
import io.tingkai.resign.model.request.UpdateUserSettingReq;
import io.tingkai.resign.model.response.ResignResponse;
import io.tingkai.resign.model.vo.DeptCoworkerInfo;
import io.tingkai.resign.model.vo.StampCardInfo;
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
	public static final String COWORKER_PATH = "/coworker";
	public static final String GET_LEADERBOARD_PATH = "/leaderBoard";

	@Autowired
	private ResignService resignService;

	@RequestMapping(value = ResignController.USER_INFO_PATH, method = RequestMethod.GET)
	public ResignResponse<UserInfo> getUserInfo() {
		UserInfo userInfo = resignService.getUserInfo();
		return new ResignResponse<UserInfo>(true, userInfo, MessageConstant.SUCCESS);
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
	public ResignResponse<StampCardInfo> getStampCardInfo() throws FieldMissingException, NotExistException {
		StampCardInfo info = resignService.getStampCardInfo();
		return new ResignResponse<StampCardInfo>(true, info, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.STAMP_CARD_RECORD_PATH, method = RequestMethod.GET)
	public ResignResponse<StampCardRecord> fetchStampCardRecord(@RequestParam UUID id) throws FieldMissingException, NotExistException {
		StampCardRecord stampCardRecord = resignService.fetchStampCardRecord(id);
		return new ResignResponse<StampCardRecord>(true, stampCardRecord, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.STAMP_CARD_RECORD_PATH, method = RequestMethod.POST)
	public SimpleResponse insertStampCardRecord(@RequestBody InsertStampCardRecordRequest stampCardRecord) throws FieldMissingException, NotExistException {
		resignService.insertStampCardRecord(stampCardRecord.toEntity());
		return new SimpleResponse(true);
	}
	
	@RequestMapping(value = ResignController.STAMP_CARD_RECORD_PATH, method = RequestMethod.DELETE)
	public SimpleResponse removeStampCardRecord(@RequestParam UUID recordId) throws FieldMissingException, NotExistException {
		resignService.removeStampCardRecord(recordId);
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.STAMP_CARD_RECORDS_PATH, method = RequestMethod.GET)
	public ResignResponse<List<StampCardRecord>> fetchStampCardRecords(@RequestParam(required = false) LocalDate startDate, @RequestParam(required = false) LocalDate endDate, @RequestParam(required = false) String dept, @RequestParam(required = false) UUID coworkerId) throws FieldMissingException, NotExistException {
		List<StampCardRecord> stampCardRecords = resignService.fetchStampCardRecords(startDate, endDate, dept, coworkerId);
		return new ResignResponse<List<StampCardRecord>>(true, stampCardRecords, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.COWORKER_PATH, method = RequestMethod.GET)
	public ResignResponse<List<DeptCoworkerInfo>> getCoworkerOptions() throws FieldMissingException, NotExistException {
		List<DeptCoworkerInfo> infos = resignService.getCoworkerOptions();
		return new ResignResponse<List<DeptCoworkerInfo>>(true, infos, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.GET_LEADERBOARD_PATH, method = RequestMethod.GET)
	public ResignResponse<List<StampCard>> getStampCards(@RequestParam int size) {
		List<StampCard> cards = resignService.getLeadingStampCards(size);
		return new ResignResponse<List<StampCard>>(true, cards, MessageConstant.SUCCESS);
	}
}