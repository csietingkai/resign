import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormLabel, CFormSelect, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilChevronDoubleRight, cilChevronRight, cilPen, cilTrash } from '@coreui/icons';
import { SetNotifyDispatcher, SetStampCardRecordsDispatcher } from '../reducer/PropsMapper';
import { getOrgCoworkerOptions, getStampCard, getStampCardId, ReduxState } from '../reducer/Selector';
import AppConfirmModal from '../components/AppConfirmModal';
import AppPagination from '../components/AppPagination';
import RecordModal, { RecordModalMode } from './include/RecordModal';
import ResignApi, { OrganizationCoworkerInfo, StampCardRecord } from '../api/resign';
import * as AppUtil from '../util/AppUtil';
import { Action } from '../util/Interface';

export interface StampRecordPageProps {
    cardId: string;
    orgCoworkerOptions: OrganizationCoworkerInfo[];
    setStampCardRecords: (stampCardRecords: StampCardRecord[]) => void;
    notify: (message: string) => void;
}

export interface StampRecordPageState {
    searchCondition: {
        startDate: Date;
        endDate: Date;
        orgId: string;
        coworkerId: string;
    };
    isSearchConditionValid: {
        startDate: boolean;
        endDate: boolean;
    };
    searchResult: StampCardRecord[];
    searchResultPage: number;
    showDeleteRecordModal: boolean;
    recordModalMode: RecordModalMode;
    holdingRecordId: string;
}

class StampRecordPage extends React.Component<StampRecordPageProps, StampRecordPageState> {

    constructor(props: StampRecordPageProps) {
        super(props);

        this.state = {
            searchCondition: {
                startDate: moment().add(-7, 'day').toDate(),
                endDate: moment().toDate(),
                orgId: '',
                coworkerId: ''
            },
            isSearchConditionValid: {
                startDate: true,
                endDate: true
            },
            searchResult: [],
            searchResultPage: 1,
            showDeleteRecordModal: false,
            recordModalMode: '',
            holdingRecordId: ''
        };
    }

    private search = async () => {
        const { notify } = this.props;
        const { searchCondition: { startDate, endDate, coworkerId }, isSearchConditionValid } = this.state;
        const isValid: boolean = isSearchConditionValid.startDate && isSearchConditionValid.endDate;
        if (!isValid) {
            notify('日期起日不可大於訖日');
            return;
        }
        const { success, data, message } = await ResignApi.getStampCardRecords(startDate, endDate, coworkerId);
        if (success) {
            this.setState({ searchResult: data, searchResultPage: 1 });
        } else {
            notify(message);
        }
    };

    private removeRecord = async (recordId: string = this.state.holdingRecordId) => {
        const { notify } = this.props;
        const { success, message } = await ResignApi.removeStampCardRecord(recordId);
        if (!success) {
            notify(message);
        }
    }

    private renderSearchCondition = (): React.ReactNode => {
        const { orgCoworkerOptions } = this.props;
        const { searchCondition, isSearchConditionValid } = this.state;
        return (
            <CRow>
                <CCol sm={7} className='mx-auto'>
                    <CCard className='mb-4'>
                        <CCardHeader>
                            <div className='d-flex'>
                                <CIcon size='lg' className='my-auto' icon={cilChevronRight} />
                                <strong className='ms-2'>查詢條件</strong>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onKeyDown={AppUtil.bindEnterKey(this.search)}>
                                <CRow className='mb-3'>
                                    <CCol xs={3}>
                                        <CFormLabel htmlFor='type' className='col-form-label'>
                                            日期
                                        </CFormLabel>
                                    </CCol>
                                    <CCol xs={12} sm={9}>
                                        <div className='row'>
                                            <div className='col-sm-6 mb-2' style={{ width: '48%' }}>
                                                <input
                                                    type='date'
                                                    id='search-startDate'
                                                    className={`form-control${!isSearchConditionValid.startDate ? ' is-invalid' : ''}`}
                                                    value={moment(searchCondition.startDate).format('YYYY-MM-DD')}
                                                    onChange={(event) => {
                                                        const startDate: Date = new Date(event.target.value);
                                                        if (!isNaN((startDate as any)?.getTime()) && !isNaN((searchCondition.endDate as any)?.getTime())) {
                                                            const isDateRangeValid = (AppUtil.toDateStr(startDate, 'YYYY-MM-DD') || '') <= (AppUtil.toDateStr(searchCondition.endDate, 'YYYY-MM-DD') || '');
                                                            isSearchConditionValid.startDate = isDateRangeValid;
                                                            isSearchConditionValid.endDate = isDateRangeValid;
                                                        }
                                                        this.setState({ searchCondition: { ...searchCondition, startDate }, isSearchConditionValid });
                                                    }}
                                                />
                                            </div>
                                            {'~'}
                                            <div className='col-sm-6 mb-2' style={{ width: '48%' }}>
                                                <input
                                                    type='date'
                                                    id='search-endDate'
                                                    className={`form-control${!isSearchConditionValid.startDate ? ' is-invalid' : ''}`}
                                                    value={moment(searchCondition.endDate).format('YYYY-MM-DD')}
                                                    onChange={(event) => {
                                                        const endDate: Date = new Date(event.target.value);
                                                        if (!isNaN((searchCondition.startDate as any)?.getTime()) && !isNaN((endDate as any)?.getTime())) {
                                                            const isDateRangeValid = (AppUtil.toDateStr(searchCondition.startDate, 'YYYY-MM-DD') || '') <= (AppUtil.toDateStr(endDate, 'YYYY-MM-DD') || '');
                                                            isSearchConditionValid.startDate = isDateRangeValid;
                                                            isSearchConditionValid.endDate = isDateRangeValid;
                                                        }
                                                        this.setState({ searchCondition: { ...searchCondition, endDate }, isSearchConditionValid });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </CCol>
                                </CRow>
                                <CRow className='mb-3'>
                                    <CCol xs={3}>
                                        <CFormLabel htmlFor='type' className='col-form-label'>
                                            搞事仔
                                        </CFormLabel>
                                    </CCol>
                                    <CCol xs={12} sm={9}>
                                        <div className='row'>
                                            <div className='col-sm-6 mb-2' style={{ width: '50%' }}>
                                                <CFormSelect
                                                    value={searchCondition.orgId}
                                                    id='record-orgId'
                                                    onChange={(event: any) => this.setState({ searchCondition: { ...searchCondition, orgId: event.target.value as string, coworkerId: '' } })}
                                                >
                                                    <option value=''>選擇部門</option>
                                                    {orgCoworkerOptions.map(o => <option key={`record-orgId-option-${o}`} value={o.orgId}>{o.orgName}</option>)}
                                                </CFormSelect>
                                            </div>
                                            <div className='col-sm-6' style={{ width: '50%' }}>
                                                <CFormSelect
                                                    value={searchCondition.coworkerId}
                                                    id='record-coworkerId'
                                                    onChange={(event: any) => this.setState({ searchCondition: { ...searchCondition, coworkerId: event.target.value as string } })}
                                                >
                                                    <option value=''>選擇搞事仔</option>
                                                    {orgCoworkerOptions.find(x => x.orgId === searchCondition.orgId)?.coworkers.map(o => <option key={`record-coworker-option-${o.id}`} value={o.id}>{o.name} {o.ename}</option>)}
                                                </CFormSelect>
                                            </div>
                                        </div>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className='text-end'>
                            <CButton className='me-2' color='success' variant='outline' onClick={this.search}>
                                查詢
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        );
    };

    private renderSearchResult = (): React.ReactNode => {
        const { searchResult, searchResultPage } = this.state;
        return (
            <CCard>
                <CCardHeader>
                    <div className='d-flex'>
                        <CIcon size='lg' className='my-auto' icon={cilChevronDoubleRight} />
                        <strong className='ms-2'>查詢結果</strong>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol xs={12}>
                            <CTable align='middle' responsive hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope='col' className='text-nowrap text-center'>日期</CTableHeaderCell>
                                        <CTableHeaderCell scope='col' className='text-nowrap text-center'>搞事仔</CTableHeaderCell>
                                        <CTableHeaderCell scope='col' className='text-nowrap text-center'>章數</CTableHeaderCell>
                                        <CTableHeaderCell scope='col' className='text-nowrap text-center'>事由</CTableHeaderCell>
                                        <CTableHeaderCell scope='col'></CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {
                                        searchResult.length == 0 &&
                                        <CTableRow>
                                            <CTableDataCell colSpan={5} className='text-center'>查無資料</CTableDataCell>
                                        </CTableRow>
                                    }
                                    {
                                        searchResult.length > 0 &&
                                        searchResult.map(r =>
                                            <CTableRow key={r.id}>
                                                <CTableDataCell className='text-nowrap text-center'>{AppUtil.toDateStr(r.date)}</CTableDataCell>
                                                <CTableDataCell className='text-nowrap text-center'>{}</CTableDataCell>
                                                <CTableDataCell className='text-nowrap text-center'>{r.point}</CTableDataCell>
                                                <CTableDataCell>{r.description}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CButtonGroup role='group'>
                                                        <CButton
                                                            color='info'
                                                            variant='outline'
                                                            size='sm'
                                                            onClick={() => this.setState({ recordModalMode: 'edit', holdingRecordId: r.id })}
                                                        >
                                                            <CIcon icon={cilPen}></CIcon>
                                                        </CButton>
                                                        <CButton
                                                            color='danger'
                                                            variant='outline'
                                                            size='sm'
                                                            onClick={() => this.setState({ showDeleteRecordModal: true, holdingRecordId: r.id })}
                                                        >
                                                            <CIcon icon={cilTrash}></CIcon>
                                                        </CButton>
                                                    </CButtonGroup>
                                                </CTableDataCell>
                                            </CTableRow>
                                        )
                                    }
                                </CTableBody>
                            </CTable>
                        </CCol>
                    </CRow>
                    <AppPagination totalDataCount={searchResult.length} currentPage={searchResultPage} onChange={(page: number) => this.setState({ searchResultPage: page })} className='justify-content-center'></AppPagination>
                </CCardBody>
            </CCard>
        );
    };

    render(): React.ReactNode {
        const { cardId, orgCoworkerOptions, setStampCardRecords } = this.props;
        const { recordModalMode, holdingRecordId, showDeleteRecordModal } = this.state;
        return (
            <React.Fragment>
                {this.renderSearchCondition()}
                {this.renderSearchResult()}
                <RecordModal
                    mode={recordModalMode}
                    cardId={cardId || ''}
                    orgCoworkerOptions={orgCoworkerOptions}
                    recordId={holdingRecordId}
                    onClose={() => this.setState({ recordModalMode: '', holdingRecordId: ''})}
                    afterSubmit={() => {
                        ResignApi.getStampCardRecords().then(({ data }) => setStampCardRecords(data));
                        this.setState({ recordModalMode: '', holdingRecordId: '' });
                        this.search();
                    }}
                />
                <AppConfirmModal
                    showModal={showDeleteRecordModal}
                    headerText='刪除本次紀錄'
                    onConfirm={async (result: boolean) => {
                        if (result) {
                            const { holdingRecordId } = this.state;
                            await this.removeRecord(holdingRecordId);
                            ResignApi.getStampCardRecords().then(({ data }) => setStampCardRecords(data));
                            this.search();
                        }
                        this.setState({ showDeleteRecordModal: false, holdingRecordId: '' });
                    }}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        cardId: getStampCardId(state),
        orgCoworkerOptions: getOrgCoworkerOptions(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<StampCardRecord[] | string | undefined>>) => {
    return {
        setStampCardRecords: SetStampCardRecordsDispatcher(dispatch),
        notify: SetNotifyDispatcher(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StampRecordPage);
