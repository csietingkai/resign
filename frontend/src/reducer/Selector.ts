import * as StateHolder from './StateHolder';
import { AuthToken } from '../api/auth';
import { Notification } from '../util/Interface';
import { OrganizationCoworkerInfo, StampCard, StampCardRecord, UserInfo } from '../api/resign';

export interface ReduxState {
    auth: ReduxAuthState;
    resign: ReduxResignState;
    setting: ReduxSystemSettingState;
}

// authReducer
export interface ReduxAuthState {
    authToken: AuthToken | undefined;
}
export const DEFAULT_REDUX_AUTH_STATE: ReduxAuthState = {
    authToken: undefined,
};
const getAuthState = (state: ReduxState): ReduxAuthState => state.auth;
export const getAuthToken = (state: ReduxState): AuthToken => getAuthState(state)?.authToken as AuthToken;
export const getAuthTokenId = (state: ReduxState): string => getAuthToken(state)?.id;
export const getAuthTokenName = (state: ReduxState): string => getAuthToken(state)?.name;
export const getAuthTokenRole = (state: ReduxState): string => getAuthToken(state)?.role;
export const getAuthTokenString = (state: ReduxState): string => getAuthToken(state)?.tokenString;
export const getAuthTokenExpiryDate = (state: ReduxState): Date => getAuthToken(state)?.expiryDate;

// resignReducer
export interface ReduxResignState {
    userInfo: UserInfo | undefined;
    stampCard: StampCard | undefined;
    stampCardReords: StampCardRecord[];
    orgCoworkerOptions: OrganizationCoworkerInfo[];
}
export const DEFAULT_REDUX_RESIGN_STATE: ReduxResignState = {
    userInfo: undefined,
    stampCard: undefined,
    stampCardReords: [],
    orgCoworkerOptions: []
};
const getResignState = (state: ReduxState): ReduxResignState => state.resign;
export const getUserInfo = (state: ReduxState): UserInfo => getResignState(state)?.userInfo as UserInfo;
export const getMaxStampCnt = (state: ReduxState): number => getUserInfo(state)?.maxStampCnt;
export const getStampCard = (state: ReduxState): StampCard => getResignState(state)?.stampCard as StampCard;
export const getStampCardId = (state: ReduxState): string => getStampCard(state)?.id;
export const getStampCardRecords = (state: ReduxState): StampCardRecord[] => getResignState(state).stampCardReords;
export const getOrgCoworkerOptions = (state: ReduxState): OrganizationCoworkerInfo[] => getResignState(state).orgCoworkerOptions;

// system variable
export interface ReduxSystemSettingState {
    loading: boolean;
    sidebarShow: boolean;
    sidebarFoldable: boolean;
    notifications: Notification[];
    isMobile: boolean;
}
export const DEFAULT_REDUX_SYSTEM_SETTING_STATE: ReduxSystemSettingState = {
    loading: false,
    sidebarShow: StateHolder.getSidebarShow(),
    sidebarFoldable: StateHolder.getSidebarFoldable(),
    notifications: [],
    isMobile: false
};
const getSystemSetting = (state: ReduxState): ReduxSystemSettingState => state.setting;
export const isLoading = (state: ReduxState): boolean => getSystemSetting(state)?.loading;
export const isSidebarShow = (state: ReduxState): boolean => getSystemSetting(state)?.sidebarShow;
export const isSidebarFoldable = (state: ReduxState): boolean => getSystemSetting(state)?.sidebarFoldable;
export const getNotifications = (state: ReduxState): Notification[] => getSystemSetting(state)?.notifications;
export const isMobile = (state: ReduxState): boolean => getSystemSetting(state)?.isMobile;
