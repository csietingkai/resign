import { Dispatch } from 'react';
import { Login, Logout, SetLoading, Notify, SetSidebarFoldable, SetSidebarShow, SetStampCardInfo, SetUserInfo } from './Action';
import { AuthToken } from '../api/auth';
import { StampCardInfo, UserInfo } from '../api/resign';
import { Action } from '../util/Interface';

// auth
export const LoginDispatcher = (dispatch: Dispatch<Action<AuthToken>>) => (vo: AuthToken): void => dispatch(Login(vo));
export const LogoutDispatcher = (dispatch: Dispatch<Action<undefined>>) => (): void => dispatch(Logout());

export const SetUserInfoDispatcher = (dispatch: Dispatch<Action<UserInfo | undefined>>) => (userInfo: UserInfo): void => dispatch(SetUserInfo(userInfo));
export const SetStampCardInfoDispatcher = (dispatch: Dispatch<Action<StampCardInfo | undefined>>) => (stampCardInfo: StampCardInfo): void => dispatch(SetStampCardInfo(stampCardInfo));

// system setting
export const SetLoadingDispatcher = (dispatch: Dispatch<Action<boolean>>) => (loading: boolean): void => dispatch(SetLoading(loading));
export const SetSidebarShowDispatcher = (dispatch: Dispatch<Action<boolean>>) => (sidebarShow: boolean): void => dispatch(SetSidebarShow(sidebarShow));
export const SetSidebarFoldableDispatcher = (dispatch: Dispatch<Action<boolean>>) => (sidebarFoldable: boolean): void => dispatch(SetSidebarFoldable(sidebarFoldable));
export const SetNotifyDispatcher = (dispatch: Dispatch<Action<string>>) => (message: string): void => dispatch(Notify(message));
