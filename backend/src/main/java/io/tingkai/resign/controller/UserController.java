package io.tingkai.resign.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.model.exception.NotExistException;
import io.tingkai.base.model.response.SimpleResponse;
import io.tingkai.resign.constant.MessageConstant;
import io.tingkai.resign.entity.UserSetting;
import io.tingkai.resign.model.response.UserResponse;
import io.tingkai.resign.service.UserService;

@RestController
@RequestMapping(value = UserController.CONROLLER_PREFIX)
public class UserController {

	public static final String CONROLLER_PREFIX = "/user";
	public static final String GET_SETTING_PATH = "/setting";
	public static final String UPDATE_SETTING_PATH = "/updateSetting";

	@Autowired
	private UserService userService;

	@RequestMapping(value = UserController.GET_SETTING_PATH, method = RequestMethod.GET)
	public UserResponse<UserSetting> get(@RequestParam(required = false) String code, @RequestParam(required = false) String name, @RequestParam(required = false, defaultValue = "true") boolean sort) {
		UserSetting setting = userService.getUserSetting();
		return new UserResponse<UserSetting>(true, setting, MessageConstant.SUCCESS);
	}

	@RequestMapping(value = UserController.UPDATE_SETTING_PATH, method = RequestMethod.POST)
	public SimpleResponse updateUserSetting(@RequestBody UserSetting setting) throws FieldMissingException, NotExistException {
		userService.updateUserSetting(setting);
		return new SimpleResponse(true);
	}
}