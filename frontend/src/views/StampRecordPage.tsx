import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormLabel, CFormSelect, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilChevronDoubleRight, cilChevronRight, cilPencil, cilTrash } from '@coreui/icons';
import ResignApi, { Coworker, DeptCoworkerInfo, StampCardRecord } from '../api/resign';
import AppPagination from '../components/AppPagination';
import { SetNotifyDispatcher } from '../reducer/PropsMapper';
import { getDeptCoworkerOptions, ReduxState } from '../reducer/Selector';
import * as AppUtil from '../util/AppUtil';
import { Action } from '../util/Interface';

export interface StampRecordPageProps {
    deptOptions: DeptCoworkerInfo[];
    notify: (message: string) => void;
}

export interface StampRecordPageState {
    searchCondition: {
        startDate: Date;
        endDate: Date;
        dept: string;
        coworkerId: string;
    };
    isSearchConditionValid: {
        startDate: boolean;
        endDate: boolean;
    };
    deptOptions: string[];
    coworkerOptions: { [dept: string]: Coworker[]; };
    coworkerInfo: { [coworkerId: string]: { dept: string, name: string, ename: string; }; };
    searchResult: StampCardRecord[];
    searchResultPage: number;
}

class StampRecordPage extends React.Component<StampRecordPageProps, StampRecordPageState> {

    constructor(props: StampRecordPageProps) {
        super(props);
        const endDate = new Date();
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7);
        const coworkerOptions = {};
        const coworkerInfo = {};
        for (const opt of props.deptOptions) {
            const { dept, coworkers } = opt;
            coworkerOptions[dept] = coworkers;
            for (const coworker of coworkers) {
                coworkerInfo[coworker.id] = {
                    dept,
                    name: coworker.name,
                    ename: coworker.ename
                };
            }
        }
        this.state = {
            searchCondition: {
                startDate,
                endDate,
                dept: '',
                coworkerId: ''
            },
            isSearchConditionValid: {
                startDate: true,
                endDate: true
            },
            deptOptions: props.deptOptions.map(x => x.dept),
            coworkerOptions,
            coworkerInfo,
            searchResult: [],
            searchResultPage: 1
        };
    }

    private search = async () => {
        const { notify } = this.props;
        const { searchCondition: { startDate, endDate, dept, coworkerId }, isSearchConditionValid } = this.state;
        const isValid: boolean = isSearchConditionValid.startDate && isSearchConditionValid.endDate;
        if (!isValid) {
            notify('日期起日不可大於訖日');
            return;
        }
        const { success, data, message } = await ResignApi.fetchStampCardRecords(startDate, endDate, dept, coworkerId);
        if (success) {
            this.setState({ searchResult: data, searchResultPage: 1 });
        } else {
            notify(message);
        }
    };

    private renderSearchCondition = (): React.ReactNode => {
        const { searchCondition, isSearchConditionValid, deptOptions, coworkerOptions } = this.state;
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
                                                    value={searchCondition.dept}
                                                    id='record-dept'
                                                    onChange={(event: any) => this.setState({ searchCondition: { ...searchCondition, dept: event.target.value as string, coworkerId: '' } })}
                                                >
                                                    <option value=''>選擇部門</option>
                                                    {deptOptions.map(o => <option key={`search-dept-option-${o}`} value={o}>{o}</option>)}
                                                </CFormSelect>
                                            </div>
                                            <div className='col-sm-6' style={{ width: '50%' }}>
                                                <CFormSelect
                                                    value={searchCondition.coworkerId}
                                                    id='record-coworkerId'
                                                    onChange={(event: any) => this.setState({ searchCondition: { ...searchCondition, coworkerId: event.target.value as string } })}
                                                >
                                                    <option value=''>選擇搞事仔</option>
                                                    {coworkerOptions[searchCondition.dept]?.map(o => <option key={`search-coworker-option-${o.id}`} value={o.id}>{o.name} {o.ename}</option>)}
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
        const { coworkerInfo, searchResult, searchResultPage } = this.state;
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
                                            <CTableDataCell colSpan={4} className='text-center'>查無資料</CTableDataCell>
                                        </CTableRow>
                                    }
                                    {
                                        searchResult.length > 0 &&
                                        searchResult.map(r =>
                                            <CTableRow key={r.id}>
                                                <CTableDataCell className='text-nowrap text-center'>{AppUtil.toDateStr(r.date)}</CTableDataCell>
                                                <CTableDataCell className='text-nowrap text-center'>{coworkerInfo[r.coworkerId].name} {coworkerInfo[r.coworkerId].ename}</CTableDataCell>
                                                <CTableDataCell className='text-nowrap text-center'>{r.point}</CTableDataCell>
                                                <CTableDataCell>{r.description}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CButtonGroup role='group'>
                                                        <CButton
                                                            color='danger'
                                                            variant='outline'
                                                            size='sm'
                                                            onClick={() => this.setState({  })}
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
        return (
            <React.Fragment>
                {this.renderSearchCondition()}
                {this.renderSearchResult()}
            </React.Fragment>
        );
    }
} const mapStateToProps = (state: ReduxState) => {
    return {
        deptOptions: getDeptCoworkerOptions(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => {
    return {
        notify: SetNotifyDispatcher(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StampRecordPage);
