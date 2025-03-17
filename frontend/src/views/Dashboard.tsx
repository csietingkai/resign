import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { SetNotifyDispatcher, SetStampCardInfoDispatcher, SetUserInfoDispatcher } from '../reducer/PropsMapper';
import { getDeptCoworkerOptions, getStampCardInfo, ReduxState } from '../reducer/Selector';
import ResignApi, { DeptCoworkerInfo, StampCardInfo, StampCardRecord, UserInfo } from '../api/resign';
import * as AppUtil from '../util/AppUtil';
import { Action } from '../util/Interface';
import RecordModal, { RecordModalMode } from './include/RecordModal';

export interface DashboardProps {
    stampCardInfo: StampCardInfo;
    deptOptions: DeptCoworkerInfo[];
    setUserInfo: (userInfo: UserInfo) => void;
    setStampCardInfo: (stampCardInfo: StampCardInfo) => void;
    notify: (message: string) => void;
}

export interface DashboardState {
    cnt: number;
    recordModalMode: RecordModalMode;
    currentRecordId?: string;
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
            recordModalMode: ''
        };
    }

    private openRecordModal = (recordId?: string) => {
        this.setState({ recordModalMode: !!recordId ? 'view' : 'edit', currentRecordId: recordId });
    };

    private renderStamps = (): React.ReactNode[] => {
        const { stampCardInfo } = this.props;
        const { cnt } = this.state;
        const cubes: React.ReactNode[] = [];
        for (let i = 0; i < cnt; i++) {
            const backgroundColor: string = stampCardInfo?.extraInfos?.length <= i ? 'var(--cui-gray-300)' : 'var(--cui-danger)';
            const text: string = stampCardInfo?.extraInfos?.length <= i ? `${AppUtil.prefixZero(i + 1)}` : stampCardInfo.extraInfos[i].recordDate;
            cubes.push(
                <CCol xs={4} sm={3} md={2} lg={1} key={`cell-${i}`} style={{ paddingLeft: 'calc(var(--cui-gutter-x) * 0.3)', paddingRight: 'calc(var(--cui-gutter-x) * 0.3)' }}>
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

    render(): React.ReactNode {
        const { stampCardInfo, deptOptions, setUserInfo, setStampCardInfo } = this.props;
        const { recordModalMode, currentRecordId } = this.state;
        return (
            <React.Fragment>
                <CRow className='mb-4' xs={{ gutter: 4 }}>
                    {this.renderStamps()}
                </CRow>
                <RecordModal
                    mode={recordModalMode}
                    cardId={stampCardInfo.id}
                    deptOptions={deptOptions}
                    recordId={currentRecordId}
                    onClose={() => this.setState({ recordModalMode: '', currentRecordId: undefined})}
                    afterSubmit={() => {
                        ResignApi.getUserInfo().then(({ data }) => setUserInfo(data));
                        ResignApi.getStampCardInfo().then(({ data }) => setStampCardInfo(data));
                        this.setState({ recordModalMode: '' });
                    }}
                />
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
