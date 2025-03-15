import { Dispatch, legacy_createStore as createStore } from 'redux';
import rootReducer from './Reducer';
import AuthApi, { AuthResponse, AuthToken } from '../api/auth';
import ResignApi, { LeadingStampCardsResponse, UserInfoResponse } from '../api/resign';
import { Login, Logout, SetIsMobile, SetLeadingStampCards, SetUserInfo } from './Action';
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
        apis.push(ResignApi.getUserInfo());
        responseHandlers.push((response: UserInfoResponse) => {
            const { success, data } = response;
            if (success) {
                if (!data?.signed) {
                    ResignApi.postInit();
                }
                dispatch(SetUserInfo(data));
            }
        });
    }

    if (tokenString) {
        apis.push(ResignApi.getLeading());
        responseHandlers.push((response: LeadingStampCardsResponse) => {
            const { success, data } = response;
            if (success) {
                dispatch(SetLeadingStampCards(data));
            } else {
                dispatch(SetLeadingStampCards([]));
            }
        });
    }

    Promise.all(apis).then((responses: ApiResponse<any>[]) => {
        responses.forEach((x, i) => responseHandlers[i](x));
    });
};

const store = createStore<any, any>(rootReducer);
export default store;
