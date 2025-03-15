import React, { Dispatch } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import { SetNotifyDispatcher, SetStampCardInfoDispatcher, SetUserInfoDispatcher } from '../reducer/PropsMapper';
import { getDeptCoworkerOptions, getStampCardInfo, ReduxState } from '../reducer/Selector';
import ResignApi, { Coworker, DeptCoworkerInfo, StampCardInfo, StampCardRecord, UserInfo } from '../api/resign';
import * as AppUtil from '../util/AppUtil';
import { Action } from '../util/Interface';

interface StampCardRecordForm extends StampCardRecord {
    dept: string;
}

export interface DashboardProps {
    stampCardInfo: StampCardInfo;
    deptOptions: DeptCoworkerInfo[];
    setUserInfo: (userInfo: UserInfo) => void;
    setStampCardInfo: (stampCardInfo: StampCardInfo) => void;
    notify: (message: string) => void;
}

export interface DashboardState {
    cnt: number;
    recordModalOpen: boolean;
    recordModalMode: 'edit' | 'view' | '';
    recordForm: StampCardRecordForm;
    deptOptions: string[];
    coworkerOptions: { [dept: string]: Coworker[]; };
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
        super(props);
        const coworkerOptions = {};
        for (const opt of props.deptOptions) {
            const { dept, coworkers } = opt;
            coworkerOptions[dept] = coworkers;
        }
        this.state = {
            cnt: 100,
            recordModalOpen: false,
            recordModalMode: '',
            recordForm: {
                id: '',
                cardId: props.stampCardInfo?.id,
                date: new Date(),
                coworkerId: '',
                point: 1,
                dept: ''
            },
            deptOptions: props.deptOptions.map(x => x.dept),
            coworkerOptions
        };
    }

    private openRecordModal = async (recordId?: string) => {
        const { deptOptions } = this.props;
        const { recordForm } = this.state;
        if (recordId) {
            const { data } = await ResignApi.fetchStampCardRecord(recordId);
            recordForm.coworkerId = data.coworkerId;
            recordForm.date = data.date;
            recordForm.dept = deptOptions.find(d => d.coworkers.findIndex(c => c.id === data.coworkerId) >= 0)?.dept || '';
            recordForm.coworkerId = data.coworkerId;
            recordForm.description = data.description;
        }
        this.setState({ recordModalMode: !!recordId ? 'view' : 'edit', recordModalOpen: true });
    };

    private onRecordModalSubmit = async () => {
        const { setUserInfo, setStampCardInfo, notify } = this.props;
        const { recordForm } = this.state;
        const { success, message } = await ResignApi.insertStampCardRecord({ ...recordForm, date: AppUtil.toDateStr(recordForm.date, 'YYYY-MM-DD') || '' });
        if (success) {
            notify(`蓋了${recordForm.point}個章！`);
            ResignApi.getUserInfo().then(({ data }) => setUserInfo(data));
            ResignApi.getStampCardInfo().then(({ data }) => setStampCardInfo(data));
            this.closeRecordModal();
        } else {
            notify(message);
        }
    };

    private closeRecordModal = () => {
        const { stampCardInfo } = this.props;
        const recordForm: StampCardRecordForm = {
            id: '',
            cardId: stampCardInfo?.id,
            date: new Date(),
            coworkerId: '',
            point: 1,
            dept: ''
        };
        this.setState({ recordModalMode: '', recordModalOpen: false, recordForm });
    };

    private renderStamps = (): React.ReactNode[] => {
        const { stampCardInfo } = this.props;
        const { cnt } = this.state;
        const cubes: React.ReactNode[] = [];
        for (let i = 0; i < cnt; i++) {
            const backgroundColor: string = stampCardInfo.extraInfos.length <= i ? 'var(--cui-gray-300)' : 'var(--cui-danger)';
            const text: string = stampCardInfo.extraInfos.length <= i ? `${AppUtil.prefixZero(i + 1)}` : stampCardInfo.extraInfos[i].recordDate;
            cubes.push(
                <CCol xs={4} sm={3} md={2} lg={1} key={`cell-${i}`} style={{ paddingLeft: 'calc(var(--cui-gutter-x) * 0.3)', paddingRight: 'calc(var(--cui-gutter-x) * 0.3)'}}>
                    <CCard onClick={() => this.openRecordModal(stampCardInfo.extraInfos[i]?.recordId)}>
                        <CCardBody className='align-items-center' style={{ padding: '0.75rem 0.75rem' }}>
                            <div className='text-white p-2' style={{ backgroundColor }}>
                                <div className='mt-1 mb-1 text-center'>{text}</div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            );
        }
        return cubes;
    };

    private renderRecordModal = (): React.ReactNode => {
        const { cnt, recordModalOpen, recordModalMode, recordForm, deptOptions, coworkerOptions } = this.state;
        return (
            <CModal alignment='center' visible={recordModalOpen} onClose={this.closeRecordModal}>
                <CModalHeader>
                    <CModalTitle>離職戳章</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm onKeyDown={recordModalMode === 'edit' ? AppUtil.bindEnterKey(this.onRecordModalSubmit) : undefined}>
                        <CRow className='mb-3'>
                            <CFormLabel htmlFor='record-date' className='col-sm-4 col-form-label required'>
                                日期
                            </CFormLabel>
                            <div className='col-sm-8'>
                                <input
                                    type='date'
                                    id='record-date'
                                    className='form-control'
                                    value={moment(recordForm.date).format('YYYY-MM-DD')}
                                    onChange={(event) => this.setState({ recordForm: { ...recordForm, date: new Date(event.target.value) } })}
                                />
                            </div>
                        </CRow>
                        <CRow className='mb-3'>
                            <CFormLabel htmlFor='record-point' className='col-sm-4 col-form-label required'>
                                蓋幾個章
                            </CFormLabel>
                            <div className='col-sm-8'>
                                <CFormInput
                                    type='number'
                                    id='record-point'
                                    value={recordForm.point}
                                    min={1}
                                    max={cnt}
                                    onChange={(event) => this.setState({ recordForm: { ...recordForm, point: AppUtil.toNumber(event.target.value) } })}
                                />
                            </div>
                        </CRow>
                        <CRow className='mb-3'>
                            <CFormLabel htmlFor='record-dept' className='col-sm-4 col-form-label required'>
                                是誰在搞
                            </CFormLabel>
                            <div className='col-sm-8'>
                                <div className='row'>
                                    <div className='col-sm-6 mb-2'>
                                        <CFormSelect
                                            value={recordForm.dept}
                                            id='record-dept'
                                            onChange={(event: any) => this.setState({ recordForm: { ...recordForm, dept: event.target.value as string, coworkerId: '' } })}
                                        >
                                            <option value=''>選擇部門</option>
                                            {deptOptions.map(o => <option key={`record-dept-option-${o}`} value={o}>{o}</option>)}
                                        </CFormSelect>
                                    </div>
                                    <div className='col-sm-6'>
                                        <CFormSelect
                                            value={recordForm.coworkerId}
                                            id='record-coworkerId'
                                            onChange={(event: any) => this.setState({ recordForm: { ...recordForm, coworkerId: event.target.value as string } })}
                                        >
                                            <option value=''>選擇搞事仔</option>
                                            {coworkerOptions[recordForm.dept]?.map(o => <option key={`record-coworker-option-${o.id}`} value={o.id}>{o.name} {o.ename}</option>)}
                                        </CFormSelect>
                                    </div>
                                </div>
                            </div>
                        </CRow>
                        <CRow className='mb-3'>
                            <CFormLabel htmlFor='record-description' className='col-sm-4 col-form-label'>
                                發生了啥
                            </CFormLabel>
                            <div className='col-sm-8'>
                                <CFormTextarea
                                    id='record-description'
                                    value={recordForm.description}
                                    rows={5}
                                    onChange={(event: any) => this.setState({ recordForm: { ...recordForm, description: event.target.value as string } })}
                                />
                            </div>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    {recordModalMode === 'edit' && <CButton color='primary' onClick={this.onRecordModalSubmit}>儲存</CButton>}
                    <CButton color='secondary' onClick={this.closeRecordModal}>關閉</CButton>
                </CModalFooter>
            </CModal>
        );
    };

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <CRow className='mb-4' xs={{ gutter: 4 }}>
                    {this.renderStamps()}
                </CRow>
                {this.renderRecordModal()}
            </React.Fragment>
        );
    }
} const mapStateToProps = (state: ReduxState) => {
    return {
        stampCardInfo: getStampCardInfo(state),
        deptOptions: getDeptCoworkerOptions(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<UserInfo | StampCardInfo | string | undefined>>) => {
    return {
        setUserInfo: SetUserInfoDispatcher(dispatch),
        setStampCardInfo: SetStampCardInfoDispatcher(dispatch),
        notify: SetNotifyDispatcher(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
