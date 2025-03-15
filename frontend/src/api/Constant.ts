export const API_URL: string = process.env.API_URL as string;

// api auth user
export const AUTH_LOGIN_PATH: string = '/login';
export const AUTH_CHANGE_PWD_PATH: string = '/changePwd';
export const AUTH_VALIDATE_PATH: string = '/validate';
export const AUTH_LOGOUT_PATH: string = '/userLogout';

// api resign
const RESIGN_API_PREFIX: string = '/resign';
export const RESIGN_GET_USERINFO_PATH: string = RESIGN_API_PREFIX + '/userInfo';
export const RESIGN_POST_INIT_PATH: string = RESIGN_API_PREFIX + '/postInit';
export const RESIGN_GET_LEADERBOARD_PATH: string = RESIGN_API_PREFIX + '/leaderBoard';
