
import { LOGIN, LOGOUT, SET_LOADING, NOTIFY, SET_SIDEBAR_FOLDABLE, SET_SIDEBAR_SHOW, SET_USER_SETTING, SET_IS_MOBILE } from './ActionType';
import { AuthToken, UserSetting } from '../api/auth';
import { Action } from '../util/Interface';

// auth
export const Login = (payload: AuthToken): Action<AuthToken> => ({ type: LOGIN, payload });
export const Logout = (): Action<undefined> => ({ type: LOGOUT, payload: undefined });
export const SetUserSetting = (payload?: UserSetting): Action<UserSetting | undefined> => ({ type: SET_USER_SETTING, payload });


// system setting
export const SetLoading = (payload: boolean): Action<boolean> => ({ type: SET_LOADING, payload });
export const SetSidebarShow = (payload: boolean): Action<boolean> => ({ type: SET_SIDEBAR_SHOW, payload });
export const SetSidebarFoldable = (payload: boolean): Action<boolean> => ({ type: SET_SIDEBAR_FOLDABLE, payload });
export const Notify = (payload: string): Action<string> => ({ type: NOTIFY, payload });
export const SetIsMobile = (payload: boolean): Action<boolean> => ({ type: SET_IS_MOBILE, payload });
