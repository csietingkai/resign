import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react';
import { ReduxState, getAuthTokenName, getUserSetting } from '../reducer/Selector';
import { SetNotifyDispatcher, SetUserSettingDispatcher } from '../reducer/PropsMapper';
import AuthApi, { UserSetting } from '../api/auth';
import * as AppUtil from '../util/AppUtil';
import { Action } from '../util/Interface';

export interface SettingPageProps {
    username: string;
    userSetting: UserSetting;
    setUserSetting: (setting: UserSetting) => void;
    notify: (message: string) => void;
}

export interface SettingPageState {
    userForm: {
        username: string;
        userPwd: string;
        conmfirmPwd: string;
    };
}

class SettingPage extends React.Component<SettingPageProps, SettingPageState> {

    constructor(props: SettingPageProps) {
        super(props);
        const { username, userSetting } = props;
        this.state = {
            userForm: {
                username: username,
                userPwd: '',
                conmfirmPwd: ''
            }
        };
    }

    private updatePwd = async () => {
        const { notify } = this.props;
        const { userForm } = this.state;
        if (userForm.userPwd !== userForm.conmfirmPwd) {
            notify('Please check field \'Confirm Password\' and \'New Password\' values are the same.');
            return;
        }
        const response = await AuthApi.changePwd(userForm.userPwd);
        const { message } = response;
        notify(message);
        this.setState({ userForm: { ...userForm, userPwd: '', conmfirmPwd: '' } });
    };

    render(): React.ReactNode {
        const { userForm } = this.state;
        return (
            <CRow>
                <CCol sm={6} className='mx-auto'>
                    <CCard className='mb-4'>
                        <CCardHeader>
                            <strong>更改使用者密碼</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onKeyDown={AppUtil.bindEnterKey(this.updatePwd)}>
                                <CRow className='mb-3'>
                                    <CCol xs={5} md={4}>
                                        <CFormLabel htmlFor='type' className='col-form-label'>
                                            使用者名稱
                                        </CFormLabel>
                                    </CCol>
                                    <CCol xs={7} md={8}>
                                        <CFormInput
                                            type='text'
                                            value={userForm.username}
                                            disabled
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className='mb-3'>
                                    <CCol xs={5} md={4}>
                                        <CFormLabel htmlFor='type' className='col-form-label'>
                                            新密碼
                                        </CFormLabel>
                                    </CCol>
                                    <CCol xs={7} md={8}>
                                        <CFormInput
                                            type='password'
                                            autoComplete='off'
                                            value={userForm.userPwd}
                                            onChange={(event) => this.setState({ userForm: { ...userForm, userPwd: event.target.value as string } })}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className='mb-3'>
                                    <CCol xs={5} md={4}>
                                        <CFormLabel htmlFor='type' className='col-form-label'>
                                            再次輸入密碼
                                        </CFormLabel>
                                    </CCol>
                                    <CCol xs={7} md={8}>
                                        <CFormInput
                                            type='password'
                                            autoComplete='off'
                                            value={userForm.conmfirmPwd}
                                            onChange={(event) => this.setState({ userForm: { ...userForm, conmfirmPwd: event.target.value as string } })}
                                        />
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className='text-end'>
                            <CButton className='me-2' color='success' variant='outline' onClick={this.updatePwd}>
                                儲存
                            </CButton>
                            <CButton color='secondary' variant='outline' onClick={() => this.setState({ userForm: { ...userForm, userPwd: '', conmfirmPwd: '' } })}>
                                清除
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        );
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        username: getAuthTokenName(state),
        userSetting: getUserSetting(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<string | UserSetting | undefined>>) => {
    return {
        notify: SetNotifyDispatcher(dispatch),
        setUserSetting: SetUserSettingDispatcher(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
