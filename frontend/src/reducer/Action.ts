
import { LOGIN, LOGOUT, SET_LOADING, NOTIFY, SET_SIDEBAR_FOLDABLE, SET_SIDEBAR_SHOW, SET_IS_MOBILE, SET_USER_INFO, SET_ORG_COWORKER, SET_STAMP_CARD_RECORDS, SET_STAMP_CARD } from './ActionType';
import { AuthToken } from '../api/auth';
import { OrganizationCoworkerInfo, StampCard, StampCardRecord, UserInfo } from '../api/resign';
import { Action } from '../util/Interface';

// auth
export const Login = (payload: AuthToken): Action<AuthToken> => ({ type: LOGIN, payload });
export const Logout = (): Action<undefined> => ({ type: LOGOUT, payload: undefined });

// resign
export const SetUserInfo = (payload: UserInfo): Action<UserInfo> => ({ type: SET_USER_INFO, payload });
export const SetOrgCoworkerInfos = (payload: OrganizationCoworkerInfo[]): Action<OrganizationCoworkerInfo[]> => ({ type: SET_ORG_COWORKER, payload });
export const SetStampCard = (payload: StampCard): Action<StampCard> => ({ type: SET_STAMP_CARD, payload});
export const SetStampCardRecords = (payload: StampCardRecord[]): Action<StampCardRecord[]> => ({ type: SET_STAMP_CARD_RECORDS, payload});

// system setting
export const SetLoading = (payload: boolean): Action<boolean> => ({ type: SET_LOADING, payload });
export const SetSidebarShow = (payload: boolean): Action<boolean> => ({ type: SET_SIDEBAR_SHOW, payload });
export const SetSidebarFoldable = (payload: boolean): Action<boolean> => ({ type: SET_SIDEBAR_FOLDABLE, payload });
export const Notify = (payload: string): Action<string> => ({ type: NOTIFY, payload });
export const SetIsMobile = (payload: boolean): Action<boolean> => ({ type: SET_IS_MOBILE, payload });
