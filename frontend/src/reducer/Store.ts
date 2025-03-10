import { Dispatch, legacy_createStore as createStore } from 'redux';
import rootReducer from './Reducer';
import AuthApi, { AuthResponse, AuthToken, UserResponse } from '../api/auth';
import { Login, Logout, SetIsMobile, SetUserSetting } from './Action';
import { ReduxState, getAuthTokenString } from './Selector';
import { Action, ApiResponse } from '../util/Interface';
import { getAuthToken } from './StateHolder';

export const validateToken = (dispatch: Dispatch<Action<AuthToken | undefined>>, getState: () => ReduxState): void => {
    const tokenString: string | undefined = getAuthToken()?.tokenString;
    if (tokenString) {
        AuthApi.validate(tokenString).then((response: AuthResponse) => {
            const { success, data } = response;
            if (success) {
                dispatch(Login(data));
                init(dispatch, getState);
            } else {
                dispatch(Logout());
            }
        }).catch(error => {
            console.error(error);
            dispatch(Logout());
        });
    } else {
        dispatch(Logout());
    }
};

export const init = (dispatch: Dispatch<Action<any>>, getState: () => ReduxState): void => {
    dispatch(SetIsMobile(navigator.userAgent.indexOf('Android') != -1))

    const apis: any[] = [];
    const responseHandlers: ((response: ApiResponse<any>) => void)[] = [];

    const tokenString: string = getAuthTokenString(getState());

    if (tokenString) {
        apis.push(AuthApi.getUserSetting());
        responseHandlers.push((response: UserResponse) => {
            const { success, data } = response;
            if (success) {
                dispatch(SetUserSetting(data));
            } else {
                dispatch(SetUserSetting(undefined));
            }
        });
    }

    Promise.all(apis).then((responses: ApiResponse<any>[]) => {
        responses.forEach((x, i) => responseHandlers[i](x));
    });
};

const store = createStore<any, any>(rootReducer);
export default store;
