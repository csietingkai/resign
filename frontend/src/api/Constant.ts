export const API_URL: string = process.env.API_URL as string;

// api auth user
export const AUTH_LOGIN_PATH: string = '/login';
export const AUTH_CHANGE_PWD_PATH: string = '/changePwd';
export const AUTH_VALIDATE_PATH: string = '/validate';
export const AUTH_LOGOUT_PATH: string = '/userLogout';
const USER_API_PREFIX: string = '/user';
export const USER_GET_SETTING_PATH: string = USER_API_PREFIX + '/setting';
export const USER_UPDATE_SETTING_PATH: string = USER_API_PREFIX + '/updateSetting';
