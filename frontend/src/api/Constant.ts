export const API_URL: string = process.env.API_URL as string;

// api auth user
export const AUTH_LOGIN_PATH: string = '/login';
export const AUTH_CHANGE_PWD_PATH: string = '/changePwd';
export const AUTH_VALIDATE_PATH: string = '/validate';
export const AUTH_LOGOUT_PATH: string = '/userLogout';

// api resign
const RESIGN_API_PREFIX: string = '/resign';
export const USER_INFO_PATH: string = RESIGN_API_PREFIX + '/userInfo';
export const POST_INIT_PATH: string = RESIGN_API_PREFIX + '/postInit';
export const STAMP_CARD_PATH: string = RESIGN_API_PREFIX + '/stampCard';
export const STAMP_CARD_RECORD_PATH: string = RESIGN_API_PREFIX + '/stampCardRecord';
export const STAMP_CARD_RECORDS_PATH: string = RESIGN_API_PREFIX + '/stampCardRecords';
export const ORGANIZATIONS_PATH: string = RESIGN_API_PREFIX + '/organizations';
export const ORGANIZATION_PATH: string = RESIGN_API_PREFIX + '/organization';
export const COWORKERS_PATH: string = RESIGN_API_PREFIX + '/coworkers';
export const COWORKER_PATH: string = RESIGN_API_PREFIX + '/coworker';
export const ORG_COWORKER_PATH: string = RESIGN_API_PREFIX + '/orgcoworkers';
export const LEADERBOARD_PATH: string = RESIGN_API_PREFIX + '/leaderboard';
