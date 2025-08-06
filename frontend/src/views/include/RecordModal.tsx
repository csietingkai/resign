import React from 'react';
import moment from 'moment';
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import ResignApi, { OrganizationCoworkerInfo, StampCardRecord } from '../../api/resign';
import * as AppUtil from '../../util/AppUtil';

interface StampCardRecordForm extends StampCardRecord {
    orgId: string;
}

export type RecordModalMode = 'edit' | 'insert' | 'view' | '';

export interface RecordModalProps {
    mode: RecordModalMode;
    cardId: string;
    recordId?: string;
    orgCoworkerOptions: OrganizationCoworkerInfo[];
    onClose: () => void;
    afterSubmit?: () => void;
}

export interface RecordModalState {
    form: StampCardRecordForm;
    isFormValid: {
        date: boolean;
        orgId: boolean;
        coworkerId: boolean;
        point: boolean;
    };
}

class RecordModal extends React.Component<RecordModalProps, RecordModalState> {

    constructor(props: RecordModalProps) {
        super(props);
        const form = this.resetForm(props.cardId);
        this.state = {
            form,
            isFormValid: {
                date: true,
                orgId: true,
                coworkerId: true,
                point: true
            }
        };
    }

    componentDidUpdate(prevProps: RecordModalProps) {
        const { recordId, cardId } = this.props;
        if (recordId && prevProps.recordId !== recordId) {
            this.fetchStampCardRecord(recordId);
        }
        if (cardId && prevProps.cardId !== cardId) {
            this.setState({ form: { ...this.state.form, cardId } });
        }
    }

    private fetchStampCardRecord = async (recordId: string) => {
        const { form } = this.state;
        const { data } = await ResignApi.getStampCardRecord(recordId);
        form.id = data.id;
        form.coworkerId = data.coworkerId;
        form.date = data.date;
        form.orgId = data.orgId;
        form.point = data.point;
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
            orgId: ''
        };
        return form;
    };

    private onModalSubmit = async () => {
        const { mode, afterSubmit } = this.props;
        const { form, isFormValid } = this.state;
        if (!isFormValid.date) {
            this.setState({ isFormValid: { ...isFormValid, date: false } });
            return;
        }
        if (!isFormValid.point) {
            this.setState({ isFormValid: { ...isFormValid, point: false } });
            return;
        }
        if (!isFormValid.orgId || !isFormValid.coworkerId) {
            this.setState({ isFormValid: { ...isFormValid, orgId: false, coworkerId: false } });
            return;
        }
        let api: any = ResignApi.insertStampCardRecord;
        if (mode === 'edit') {
            api = ResignApi.updateStampCardRecord;
        }
        const { success } = await api({ ...form, date: AppUtil.toDateStr(form.date, 'YYYY-MM-DD') || '' });
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
            orgId: ''
        };
        this.setState({ form }, this.props.onClose);
    };

    render(): React.ReactNode {
        const { mode, orgCoworkerOptions } = this.props;
        const { form, isFormValid } = this.state;
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
                            <CFormLabel htmlFor='record-orgId' className='col-sm-4 col-form-label required'>
                                是誰在搞
                            </CFormLabel>
                            <div className='col-sm-8'>
                                <div className='row'>
                                    <div className='col-sm-6 mb-2'>
                                        <CFormSelect
                                            value={form.orgId}
                                            id='record-orgId'
                                            className={`form-control${!isFormValid.orgId ? ' is-invalid' : ''}`}
                                            onChange={(event) => {
                                                const orgId: string = event.target.value as string;
                                                isFormValid.orgId = !!orgId;
                                                isFormValid.coworkerId = false;
                                                this.setState({ form: { ...form, orgId, coworkerId: '' }, isFormValid });
                                            }}
                                        >
                                            <option value=''>選擇部門</option>
                                            {orgCoworkerOptions.map(o => <option key={`record-orgId-option-${o}`} value={o.orgId}>{o.orgName}</option>)}
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
                                            {orgCoworkerOptions.find(x => x.orgId === form.orgId)?.coworkers.map(o => <option key={`record-coworker-option-${o.id}`} value={o.id}>{o.name} {o.ename}</option>)}
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
                    <CButton color='primary' onClick={this.onModalSubmit}>儲存</CButton>
                    <CButton color='secondary' onClick={this.closeModal}>關閉</CButton>
                </CModalFooter>
            </CModal>
        );
    }
}

export default RecordModal;
