import { Dispatch, legacy_createStore as createStore } from 'redux';
import rootReducer from './Reducer';
import AuthApi, { AuthResponse, AuthToken } from '../api/auth';
import ResignApi, { OrgCoworkerInfosResponse, StampCardRecordsResponse, StampCardResponse, UserInfoResponse } from '../api/resign';
import { Login, Logout, SetIsMobile, SetOrgCoworkerInfos, SetStampCard, SetStampCardRecords, SetUserInfo } from './Action';
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
    dispatch(SetIsMobile(navigator.userAgent.indexOf('Android') != -1));

    const apis: any[] = [];
    const responseHandlers: ((response: ApiResponse<any>) => void)[] = [];

    const tokenString: string = getAuthTokenString(getState());

    if (tokenString) {
        apis.push(ResignApi.getUserInfo());
        responseHandlers.push((response: UserInfoResponse) => {
            const { success, data } = response;
            if (success) {
                if (!data?.signed) {
                    ResignApi.postInit().then(({ success }) => {
                        if (success) {
                            ResignApi.getUserInfo().then(({ data }) => dispatch(SetUserInfo(data)));
                        }
                    });
                }
                dispatch(SetUserInfo(data));
            }
        });

        apis.push(ResignApi.getOrgCoworkerOptions());
        responseHandlers.push((response: OrgCoworkerInfosResponse) => {
            const { success, data } = response;
            if (success) {
                dispatch(SetOrgCoworkerInfos(data));
            } else {
                dispatch(SetOrgCoworkerInfos([]));
            }
        });

        apis.push(ResignApi.getStampCard());
        responseHandlers.push((response: StampCardResponse) => {
            const { success, data } = response;
            if (success) {
                dispatch(SetStampCard(data));
                ResignApi.getStampCardRecords().then((response2: StampCardRecordsResponse) => {
                    if (response2.success) {
                        dispatch(SetStampCardRecords(response2.data));
                    }
                })
            }
        });
    }

    Promise.all(apis).then((responses: ApiResponse<any>[]) => {
        responses.forEach((x, i) => responseHandlers[i](x));
    });
};

const store = createStore<any, any>(rootReducer);
export default store;
