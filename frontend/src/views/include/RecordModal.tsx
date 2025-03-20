import React, { Dispatch } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import { SetNotifyDispatcher, SetStampCardInfoDispatcher, SetUserInfoDispatcher } from '../../reducer/PropsMapper';
import { getDeptCoworkerOptions, getStampCardInfo, ReduxState } from '../../reducer/Selector';
import ResignApi, { Coworker, DeptCoworkerInfo, StampCardInfo, StampCardRecord, UserInfo } from '../../api/resign';
import * as AppUtil from '../../util/AppUtil';
import { Action } from '../../util/Interface';

interface StampCardRecordForm extends StampCardRecord {
    dept: string;
}

export type RecordModalMode = 'edit' | 'view' | '';

export interface RecordModalProps {
    mode: RecordModalMode;
    cardId: string;
    recordId?: string;
    deptOptions: DeptCoworkerInfo[];
    onClose: () => void;
    afterSubmit?: () => void;
}

export interface RecordModalState {
    form: StampCardRecordForm;
    isFormValid: {
        date: boolean;
        dept: boolean;
        coworkerId: boolean;
        point: boolean;
    };
    deptOptions: string[];
    coworkerOptions: { [dept: string]: Coworker[]; };
}

class RecordModal extends React.Component<RecordModalProps, RecordModalState> {

    constructor(props: RecordModalProps) {
        super(props);
        const { deptOptions, coworkerOptions } = this.handleOptions(props.deptOptions);
        const form = this.resetForm(props.cardId);
        this.state = {
            form,
            isFormValid: {
                date: true,
                dept: true,
                coworkerId: true,
                point: true
            },
            deptOptions,
            coworkerOptions
        };
    }

    componentDidUpdate(prevProps: RecordModalProps) {
        const { recordId, cardId, deptOptions } = this.props;
        if (recordId && prevProps.recordId !== recordId) {
            this.fetchStampCardRecord(recordId);
        }
        if (deptOptions && prevProps.deptOptions?.length != deptOptions?.length) {
            const { deptOptions, coworkerOptions } = this.handleOptions(this.props.deptOptions);
            this.setState({ deptOptions, coworkerOptions });
        }
        if (cardId && prevProps.cardId !== cardId) {
            this.setState({ form: { ...this.state.form, cardId } });
        }
    }

    private handleOptions = (deptOptions: DeptCoworkerInfo[]): { deptOptions: string[], coworkerOptions: { [dept: string]: Coworker[]; }; } => {
        const coworkerOptions = {};
        for (const opt of deptOptions) {
            const { dept, coworkers } = opt;
            coworkerOptions[dept] = coworkers;
        }
        return {
            deptOptions: deptOptions.map(x => x.dept),
            coworkerOptions
        };
    };

    private fetchStampCardRecord = async (recordId: string) => {
        const { deptOptions } = this.props;
        const { form } = this.state;
        const { data } = await ResignApi.fetchStampCardRecord(recordId);
        form.coworkerId = data.coworkerId;
        form.date = data.date;
        form.dept = deptOptions.find(d => d.coworkers.findIndex(c => c.id === data.coworkerId) >= 0)?.dept || '';
        form.coworkerId = data.coworkerId;
        form.description = data.description;
        this.setState({ form });
    };

    private resetForm = (cardId: string = this.props.cardId): StampCardRecordForm => {
        const form: StampCardRecordForm = {
            id: '',
            cardId,
            date: new Date(),
            coworkerId: '',
            point: 1,
            dept: ''
        };
        return form;
    };

    private onModalSubmit = async () => {
        const { afterSubmit } = this.props;
        const { form, isFormValid } = this.state;
        if (!isFormValid.date) {
            this.setState({ isFormValid: { ...isFormValid, date: false } });
            return;
        }
        if (!isFormValid.point) {
            this.setState({ isFormValid: { ...isFormValid, point: false } });
            return;
        }
        if (!isFormValid.dept || !isFormValid.coworkerId) {
            this.setState({ isFormValid: { ...isFormValid, dept: false, coworkerId: false } });
            return;
        }
        const { success } = await ResignApi.insertStampCardRecord({ ...form, date: AppUtil.toDateStr(form.date, 'YYYY-MM-DD') || '' });
        if (success) {
            this.closeModal();
            if (afterSubmit) {
                afterSubmit();
            }
        }
    };

    private closeModal = () => {
        const form: StampCardRecordForm = {
            id: '',
            cardId: this.props.cardId,
            date: new Date(),
            coworkerId: '',
            point: 1,
            dept: ''
        };
        this.setState({ form }, this.props.onClose);
    };

    render(): React.ReactNode {
        const { mode } = this.props;
        const { form, isFormValid, deptOptions, coworkerOptions } = this.state;
        return (
            <CModal alignment='center' aria-modal visible={!!mode} onClose={this.closeModal}>
                <CModalHeader>
                    <CModalTitle>離職戳章</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm onKeyDown={mode === 'edit' ? AppUtil.bindEnterKey(this.onModalSubmit) : undefined}>
                        <CRow className='mb-3'>
                            <CFormLabel htmlFor='record-date' className='col-sm-4 col-form-label required'>
                                日期
                            </CFormLabel>
                            <div className='col-sm-8'>
                                <input
                                    type='date'
                                    id='record-date'
                                    className={`form-control${!isFormValid.date ? ' is-invalid' : ''}`}
                                    value={moment(form.date).format('YYYY-MM-DD')}
                                    onChange={(event) => {
                                        const date: Date = new Date(event.target.value);
                                        isFormValid.date = !isNaN((date as any)?.getTime());
                                        this.setState({ form: { ...form, date }, isFormValid });
                                    }}
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
                                    value={form.point}
                                    min={1}
                                    className={`form-control${!isFormValid.point ? ' is-invalid' : ''}`}
                                    onChange={(event) => {
                                        const point: number = AppUtil.toNumber(event.target.value);
                                        isFormValid.point = !!point;
                                        this.setState({ form: { ...form, point } });
                                    }}
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
                                            value={form.dept}
                                            id='record-dept'
                                            className={`form-control${!isFormValid.dept ? ' is-invalid' : ''}`}
                                            onChange={(event) => {
                                                const dept: string = event.target.value as string;
                                                isFormValid.dept = !!dept;
                                                isFormValid.coworkerId = false;
                                                this.setState({ form: { ...form, dept, coworkerId: '' }, isFormValid });
                                            }}
                                        >
                                            <option value=''>選擇部門</option>
                                            {deptOptions.map(o => <option key={`record-dept-option-${o}`} value={o}>{o}</option>)}
                                        </CFormSelect>
                                    </div>
                                    <div className='col-sm-6'>
                                        <CFormSelect
                                            value={form.coworkerId}
                                            id='record-coworkerId'
                                            className={`form-control${!isFormValid.coworkerId ? ' is-invalid' : ''}`}
                                            onChange={(event) => {
                                                const coworkerId: string = event.target.value as string;
                                                isFormValid.coworkerId = !!coworkerId;
                                                this.setState({ form: { ...form, coworkerId }, isFormValid });
                                            }}
                                        >
                                            <option value=''>選擇搞事仔</option>
                                            {coworkerOptions[form.dept]?.map(o => <option key={`record-coworker-option-${o.id}`} value={o.id}>{o.name} {o.ename}</option>)}
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
                                    value={form.description}
                                    rows={5}
                                    onChange={(event: any) => this.setState({ form: { ...form, description: event.target.value as string } })}
                                />
                            </div>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    {mode === 'edit' && <CButton color='primary' onClick={this.onModalSubmit}>儲存</CButton>}
                    <CButton color='secondary' onClick={this.closeModal}>關閉</CButton>
                </CModalFooter>
            </CModal>
        );
    }
}

export default RecordModal;
