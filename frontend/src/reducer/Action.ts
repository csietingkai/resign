
import { LOGIN, LOGOUT, SET_LOADING, NOTIFY, SET_SIDEBAR_FOLDABLE, SET_SIDEBAR_SHOW, SET_IS_MOBILE, SET_LEADING_STAMP_CARDS, SET_USER_INFO } from './ActionType';
import { AuthToken } from '../api/auth';
import { StampCard, UserInfo } from '../api/resign';
import { Action } from '../util/Interface';

// auth
export const Login = (payload: AuthToken): Action<AuthToken> => ({ type: LOGIN, payload });
export const Logout = (): Action<undefined> => ({ type: LOGOUT, payload: undefined });

// resign
export const SetUserInfo = (payload: UserInfo): Action<UserInfo> => ({ type: SET_USER_INFO, payload });
export const SetLeadingStampCards = (payload: StampCard[]): Action<StampCard[]> => ({ type: SET_LEADING_STAMP_CARDS, payload });

// system setting
export const SetLoading = (payload: boolean): Action<boolean> => ({ type: SET_LOADING, payload });
export const SetSidebarShow = (payload: boolean): Action<boolean> => ({ type: SET_SIDEBAR_SHOW, payload });
export const SetSidebarFoldable = (payload: boolean): Action<boolean> => ({ type: SET_SIDEBAR_FOLDABLE, payload });
export const Notify = (payload: string): Action<string> => ({ type: NOTIFY, payload });
export const SetIsMobile = (payload: boolean): Action<boolean> => ({ type: SET_IS_MOBILE, payload });
