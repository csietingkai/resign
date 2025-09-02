import React from 'react';
import { CButton, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';
import ResignApi from '../../api/resign';
import * as AppUtil from '../../util/AppUtil';

interface OrganizationForm {
    id: string;
    name: string;
}

export type OrganizationModalMode = 'edit' | 'insert' | 'view' | '';

export interface OrganizationModalProps {
    mode: OrganizationModalMode;
    organizationId: string;
    onClose: () => void;
    afterSubmit?: () => void;
}

export interface OrganizationModalState {
    form: OrganizationForm;
    isFormValid: {
        name: boolean;
    };
}

class OrganizationModal extends React.Component<OrganizationModalProps, OrganizationModalState> {

    constructor(props: OrganizationModalProps) {
        super(props);
        const form = this.resetForm(props.organizationId);
        this.state = {
            form,
            isFormValid: {
                name: true
            }
        };
    }

    componentDidUpdate(prevProps: OrganizationModalProps) {
        const { mode, organizationId } = this.props;
        if (organizationId && prevProps.organizationId !== organizationId) {
            this.setState({ form: this.resetForm(organizationId) });
            mode === 'edit' && this.fetchOrganization(organizationId);
        }
    }

    private fetchOrganization = async (organizationId: string) => {
        const { form } = this.state;
        const { data } = await ResignApi.getOrganization(organizationId);
        form.id = data.id;
        form.name = data.name;
        this.setState({ form });
    };

    private resetForm = (organizationId: string = this.props.organizationId): OrganizationForm => {
        const form: OrganizationForm = {
            id: organizationId,
            name: ''
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
        let api: any = ResignApi.insertOrganization;
        if (mode === 'edit') {
            api = ResignApi.updateOrganization;
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
        this.setState({ form: { id: '', name: '' } }, this.props.onClose);
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
                            <CFormLabel htmlFor='organization-name' className='col-sm-4 col-form-label required'>
                                名稱
                            </CFormLabel>
                            <div className='col-sm-8'>
                                <CFormInput
                                    type='text'
                                    id='organization-name'
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

export default OrganizationModal;
