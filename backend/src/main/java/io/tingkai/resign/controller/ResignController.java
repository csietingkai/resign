package io.tingkai.resign.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import io.tingkai.resign.entity.UserInfo;
import io.tingkai.resign.model.response.ResignResponse;
import io.tingkai.resign.service.ResignService;

@RestController
@RequestMapping(value = ResignController.CONROLLER_PREFIX)
public class ResignController {

	public static final String CONROLLER_PREFIX = "/resign";
	public static final String RESIGN_GET_USERINFO_PATH = "/userInfo";
	public static final String RESIGN_POST_INIT_PATH = "/postInit";
	public static final String RESIGN_GET_LEADERBOARD_PATH = "/leaderBoard";

	@Autowired
	private ResignService resignService;

	@RequestMapping(value = ResignController.RESIGN_GET_USERINFO_PATH, method = RequestMethod.GET)
	public ResignResponse<UserInfo> getUserInfo() {
		UserInfo userInfo = resignService.getUserInfo();
		return new ResignResponse<UserInfo>(true, userInfo, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = ResignController.RESIGN_POST_INIT_PATH, method = RequestMethod.POST)
	public SimpleResponse postInit() throws AlreadyExistException, FieldMissingException, NotExistException {
		resignService.postInit();
		return new SimpleResponse(true);
	}

	@RequestMapping(value = ResignController.RESIGN_GET_LEADERBOARD_PATH, method = RequestMethod.GET)
	public ResignResponse<List<StampCard>> getStampCards(@RequestParam int size) {
		List<StampCard> cards = resignService.getLeadingStampCards(size);
		return new ResignResponse<List<StampCard>>(true, cards, MessageConstant.SUCCESS);
	}
}