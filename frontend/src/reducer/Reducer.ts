import { combineReducers } from 'redux';
import axios from 'axios';
import { AuthToken } from '../api/auth';
import { DEFAULT_REDUX_AUTH_STATE, DEFAULT_REDUX_RESIGN_STATE, DEFAULT_REDUX_SYSTEM_SETTING_STATE, ReduxAuthState, ReduxResignState, ReduxSystemSettingState } from './Selector';
import { LOGIN, LOGOUT, SET_LOADING, NOTIFY, SET_SIDEBAR_FOLDABLE, SET_SIDEBAR_SHOW, SET_IS_MOBILE, SET_USER_INFO, SET_ORG_COWORKER, SET_STAMP_CARD, SET_STAMP_CARD_RECORDS } from './ActionType';
import { removeAuthToken, setAuthToken, setSidebarFoldable, setSidebarShow } from './StateHolder';
import { OrganizationCoworkerInfo, StampCard, StampCardRecord, UserInfo } from '../api/resign';
import { Action } from '../util/Interface';

const authReducer = (state: ReduxAuthState = DEFAULT_REDUX_AUTH_STATE, action: Action<AuthToken>): ReduxAuthState => {
    const newState: ReduxAuthState = { ...state };
    const { type, payload } = action;
    if (type === LOGIN) {
        if (payload) {
            const authToken = payload as AuthToken;;
            setAuthToken(authToken);
            newState.authToken = authToken;
            axios.defaults.headers['X-Auth-Token'] = authToken.tokenString;
            const { href } = window.location;
            if (href.indexOf('login') >= 0) {
                window.location.replace('/#/dashboard');
            }
        } else {
            removeAuthToken();
            newState.authToken = undefined;
            window.location.replace('/#/login');
        }
    } else if (type === LOGOUT) {
        removeAuthToken();
        newState.authToken = undefined;
        window.location.replace('/#/login');
    }
    return newState;
};

const resignReducer = (state: ReduxResignState = DEFAULT_REDUX_RESIGN_STATE, action: Action<UserInfo | StampCard | StampCardRecord[] | OrganizationCoworkerInfo[]>): ReduxResignState => {
    const newState: ReduxResignState = { ...state };
    const { type, payload } = action;
    if (type === SET_USER_INFO) {
        newState.userInfo = payload as UserInfo;
    } else if (type === SET_ORG_COWORKER) {
        newState.orgCoworkerOptions = payload as OrganizationCoworkerInfo[];
    } else if (type === SET_STAMP_CARD) {
        newState.stampCard = payload as StampCard;
    } else if (type === SET_STAMP_CARD_RECORDS) {
        newState.stampCardReords = payload as StampCardRecord[];
    }
    return newState;
}

const systemReducer = (state: ReduxSystemSettingState = DEFAULT_REDUX_SYSTEM_SETTING_STATE, action: Action<boolean | string>): ReduxSystemSettingState => {
    const newState: ReduxSystemSettingState = { ...state };
    const { type, payload } = action;
    if (type === SET_LOADING) {
        newState.loading = payload as boolean;
    } else if (type === SET_SIDEBAR_SHOW) {
        newState.sidebarShow = payload as boolean;
        setSidebarShow(newState.sidebarShow);
    } else if (type === SET_SIDEBAR_FOLDABLE) {
        newState.sidebarFoldable = payload as boolean;
        setSidebarFoldable(newState.sidebarFoldable);
    } else if (type === NOTIFY) {
        const now: number = new Date().getTime();
        newState.notifications = [...newState.notifications, { time: now, message: payload as string }].filter(x => now - x.time <= 30000);
    } else if (type === SET_IS_MOBILE) {
        newState.isMobile = payload as boolean;
    }
    return newState;
};

const reducers = [
    { key: 'auth', reducer: authReducer },
    { key: 'resign', reducer: resignReducer },
    { key: 'setting', reducer: systemReducer }
];

export default combineReducers(reducers.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.reducer;
    return acc;
}, {}));
