import { Dispatch } from 'react';
import { Login, Logout, SetLoading, Notify, SetSidebarFoldable, SetSidebarShow, SetUserInfo, SetStampCardRecords } from './Action';
import { AuthToken } from '../api/auth';
import { StampCardRecord, UserInfo } from '../api/resign';
import { Action } from '../util/Interface';

// auth
export const LoginDispatcher = (dispatch: Dispatch<Action<AuthToken>>) => (vo: AuthToken): void => dispatch(Login(vo));
export const LogoutDispatcher = (dispatch: Dispatch<Action<undefined>>) => (): void => dispatch(Logout());

export const SetUserInfoDispatcher = (dispatch: Dispatch<Action<UserInfo | undefined>>) => (userInfo: UserInfo): void => dispatch(SetUserInfo(userInfo));
export const SetStampCardRecordsDispatcher = (dispatch: Dispatch<Action<StampCardRecord[]>>) => (stampCardRecords: StampCardRecord[]): void => dispatch(SetStampCardRecords(stampCardRecords));

// system setting
export const SetLoadingDispatcher = (dispatch: Dispatch<Action<boolean>>) => (loading: boolean): void => dispatch(SetLoading(loading));
export const SetSidebarShowDispatcher = (dispatch: Dispatch<Action<boolean>>) => (sidebarShow: boolean): void => dispatch(SetSidebarShow(sidebarShow));
export const SetSidebarFoldableDispatcher = (dispatch: Dispatch<Action<boolean>>) => (sidebarFoldable: boolean): void => dispatch(SetSidebarFoldable(sidebarFoldable));
export const SetNotifyDispatcher = (dispatch: Dispatch<Action<string>>) => (message: string): void => dispatch(Notify(message));
