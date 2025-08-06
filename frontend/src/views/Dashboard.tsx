import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { SetNotifyDispatcher, SetStampCardRecordsDispatcher } from '../reducer/PropsMapper';
import { getMaxStampCnt, getOrgCoworkerOptions, getStampCard, getStampCardRecords, ReduxState } from '../reducer/Selector';
import ResignApi, { OrganizationCoworkerInfo, StampCard, StampCardRecord, UserInfo } from '../api/resign';
import * as AppUtil from '../util/AppUtil';
import { Action } from '../util/Interface';
import RecordModal, { RecordModalMode } from './include/RecordModal';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';

export interface DashboardProps {
    maxStampCnt: number;
    stampCard: StampCard;
    stampCardRecords: StampCardRecord[];
    orgCoworkerOptions: OrganizationCoworkerInfo[];
    setStampCardRecords: (stampCardRecords: StampCardRecord[]) => void;
    notify: (message: string) => void;
}

export interface DashboardState {
    recordModalMode: RecordModalMode;
    currentRecordId?: string;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            recordModalMode: ''
        };
    }

    private openRecordModal = (recordId?: string) => {
        this.setState({ recordModalMode: !!recordId ? 'edit' : 'insert', currentRecordId: recordId });
    };

    private renderStamps = (): React.ReactNode[] => {
        const { stampCardRecords, maxStampCnt } = this.props;
        const stamps: { date: Date, recordId: string }[] = [];
        for (let i = 0; i < stampCardRecords.length; i++) {
            for (let j = 0; j < stampCardRecords[i].point; j++) {
                stamps.push({
                    date: stampCardRecords[i].date,
                    recordId: stampCardRecords[i].id
                })
            }
        }
        const cubes: React.ReactNode[] = [];
        for (let i = 0; i < maxStampCnt; i++) {
            let backgroundColor: string = 'var(--cui-gray-300)';
            if (stamps.length > i) {
                backgroundColor = 'var(--cui-danger)';
            }
            let text: string = `${AppUtil.prefixZero(i + 1)}`;
            if (stamps.length > i) {
                text = AppUtil.toDateStr(stamps[i].date, 'MM-DD') || '';
            }
            cubes.push(
                <CCol xs={4} sm={3} md={2} lg={1} key={`cell-${i}`} style={{ paddingLeft: 'calc(var(--cui-gutter-x) * 0.3)', paddingRight: 'calc(var(--cui-gutter-x) * 0.3)' }}>
                    <CCard onClick={() => this.openRecordModal(stamps[i]?.recordId)}>
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
        const { stampCard, orgCoworkerOptions, setStampCardRecords } = this.props;
        const { recordModalMode, currentRecordId } = this.state;
        return (
            <React.Fragment>
                <CRow className='mb-4' xs={{ gutter: 4 }}>
                    {this.renderStamps()}
                </CRow>
                <RecordModal
                    mode={recordModalMode}
                    cardId={stampCard?.id || ''}
                    orgCoworkerOptions={orgCoworkerOptions}
                    recordId={currentRecordId}
                    onClose={() => this.setState({ recordModalMode: '', currentRecordId: undefined})}
                    afterSubmit={() => {
                        ResignApi.getStampCardRecords().then(({ data }) => setStampCardRecords(data));
                        this.setState({ recordModalMode: '' });
                    }}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        maxStampCnt: getMaxStampCnt(state),
        stampCard: getStampCard(state),
        stampCardRecords: getStampCardRecords(state),
        orgCoworkerOptions: getOrgCoworkerOptions(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<StampCardRecord[] | UserInfo | string | undefined>>) => {
    return {
        setStampCardRecords: SetStampCardRecordsDispatcher(dispatch),
        notify: SetNotifyDispatcher(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
