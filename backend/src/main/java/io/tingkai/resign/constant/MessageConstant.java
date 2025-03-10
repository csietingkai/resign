package io.tingkai.resign.constant;

public class MessageConstant {

	// simple message
	public static final String SUCCESS = "SUCCESS";
	public static final String FAIL = "FAIL";
	public static final String QUERY_NO_DATA = "Query for {0} Find No Data";
	public static final String ALREADY_EXIST = "Data Already Exists in Database";
	public static final String NOT_EXIST = "Data Not Exists in Database";
	public static final String FIELD_MISSING = "Not All Required Fields are Filled";

	// auth
	public static final String AUTHENTICATE_FAIL = "Bad Token";
	public static final String LOGIN_SUCCESS = "User: {0} Login Success";
	public static final String LOGOUT_SUCCESS = "User Logout Success";
	public static final String USER_NOT_FOUND = "Username: {0} not found";
	public static final String WRONG_PASSWORD = "Wrong password";
	public static final String CREATE_USER_WARN = "Create User: {0} warning, cause by: {1}";
	public static final String AUTH_TOKEN_EXPIRE = "Auth Token has been expired";
	public static final String NO_THIS_ROLE = "Role Error: {0}";
	public static final String USER_CHANGE_SETTING_SUCCESS = "User Change Settings Success";
	public static final String USER_CHANGE_PASSWORD_SUCCESS = "User Change Password Success";
}
