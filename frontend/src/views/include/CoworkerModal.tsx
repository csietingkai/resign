import React from 'react';
import { CButton, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import ResignApi from '../../api/resign';
import * as AppUtil from '../../util/AppUtil';

interface CoworkerForm {
    id: string;
    organizationId: string;
    name: string;
    ename: string
}

export type CoworkerModalMode = 'edit' | 'insert' | 'view' | '';

export interface CoworkerModalProps {
    mode: CoworkerModalMode;
    organizationId: string;
    coworkerId: string;
    onClose: () => void;
    afterSubmit?: () => void;
}

export interface CoworkerModalState {
    form: CoworkerForm;
    isFormValid: {
        name: boolean;
        ename: boolean;
    };
}

class CoworkerModal extends React.Component<CoworkerModalProps, CoworkerModalState> {

    constructor(props: CoworkerModalProps) {
        super(props);
        const form = this.resetForm(props.coworkerId);
        this.state = {
            form,
            isFormValid: {
                name: true,
                ename: true
            }
        };
    }

    componentDidUpdate(prevProps: CoworkerModalProps) {
        const { mode, organizationId, coworkerId } = this.props;
        if (organizationId && prevProps.organizationId !== organizationId) {
            this.setState({ form: { ...this.state.form, organizationId }})
        }
        if (coworkerId && prevProps.coworkerId !== coworkerId) {
            this.setState({ form: this.resetForm() });
            mode === 'edit' && this.fetchCoworker(coworkerId);
        }
    }

    private fetchCoworker = async (coworkerId: string) => {
        const { form } = this.state;
        const { data } = await ResignApi.getCoworker(coworkerId);
        form.id = data.id;
        form.name = data.name;
        form.ename = data.ename;
        this.setState({ form });
    };

    private resetForm = (coworkerId: string = this.props.coworkerId): CoworkerForm => {
        const form: CoworkerForm = {
            id: coworkerId,
            organizationId: this.props.organizationId,
            name: '',
            ename: ''
        };
        return form;
    };

    private onModalSubmit = async () => {
        const { mode, afterSubmit } = this.props;
        const { form, isFormValid } = this.state;
        if (!form.name) {
            this.setState({ isFormValid: { ...isFormValid, name: false } });
            return;
        }
        if (!form.ename) {
            this.setState({ isFormValid: { ...isFormValid, ename: false } });
            return;
        }
        let api: any = ResignApi.insertCoworker;
        if (mode === 'edit') {
            api = ResignApi.updateCoworker;
        }
        const { success } = await api({ ...form });
        if (success) {
            this.closeModal();
            if (afterSubmit) {
                afterSubmit();
            }
        }
    };

    private closeModal = () => {
        this.setState({ form: { id: '', organizationId: this.props.organizationId, name: '', ename: '' } }, this.props.onClose);
    };

    render(): React.ReactNode {
        const { mode } = this.props;
        const { form, isFormValid } = this.state;
        return (
            <CModal alignment='center' aria-modal visible={!!mode} onClose={this.closeModal}>
                <CModalHeader>
                    <CModalTitle>組織</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm onKeyDown={(mode === 'edit' || mode === 'insert') ? AppUtil.bindEnterKey(this.onModalSubmit) : undefined}>
                        <CRow className='mb-3'>
                            <CFormLabel htmlFor='coworker-name' className='col-sm-4 col-form-label required'>
                                中文名
                            </CFormLabel>
                            <div className='col-sm-8'>
                                <CFormInput
                                    type='text'
                                    id='coworker-name'
                                    className={`form-control${!isFormValid.name ? ' is-invalid' : ''}`}
                                    value={form.name}
                                    onChange={(event) => {
                                        const name: string = event.target.value;
                                        isFormValid.name = !!name;
                                        this.setState({ form: { ...form, name }, isFormValid });
                                    }}
                                />
                            </div>
                        </CRow>
                        <CRow className='mb-3'>
                            <CFormLabel htmlFor='coworker-ename' className='col-sm-4 col-form-label required'>
                                英文名
                            </CFormLabel>
                            <div className='col-sm-8'>
                                <CFormInput
                                    type='text'
                                    id='coworker-ename'
                                    className={`form-control${!isFormValid.ename ? ' is-invalid' : ''}`}
                                    value={form.ename}
                                    onChange={(event) => {
                                        const ename: string = event.target.value;
                                        isFormValid.ename = !!ename;
                                        this.setState({ form: { ...form, ename }, isFormValid });
                                    }}
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

export default CoworkerModal;
