import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButtonGroup, CFormSelect, CInputGroup } from '@coreui/react';
import { cilChevronRight, cilPen, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { SetNotifyDispatcher } from '../reducer/PropsMapper';
import { ReduxState } from '../reducer/Selector';
import ResignApi, { CoworkerVo, OrganizationVo } from '../api/resign';
import AppConfirmModal from '../components/AppConfirmModal';
import { Action } from '../util/Interface';
import OrganizationModal, { OrganizationModalMode } from './include/OrganizationModal';
import CoworkerModal, { CoworkerModalMode } from './include/CoworkerModal';

export interface CoworkerSettingPageProps {
    notify: (message: string) => void;
}

export interface CoworkerSettingPageState {
    organizations: OrganizationVo[];
    showEditOrganizationModal: OrganizationModalMode;
    showDeleteOrganizationModal: boolean;
    holdingOrganizationId: string;
    selectOrganizationId: string;
    showEditCoworkerModal: CoworkerModalMode;
    showDeleteCoworkerModal: boolean;
    holdingCoworkerId: string;
    coworkers: CoworkerVo[];
}

class CoworkerSettingPage extends React.Component<CoworkerSettingPageProps, CoworkerSettingPageState> {

    constructor(props: CoworkerSettingPageProps) {
        super(props);
        this.state = {
            organizations: [],
            showEditOrganizationModal: '',
            showDeleteOrganizationModal: false,
            holdingOrganizationId: '',
            selectOrganizationId: '',
            coworkers: [],
            showEditCoworkerModal: '',
            showDeleteCoworkerModal: false,
            holdingCoworkerId: ''
        };
        this.init();
    }

    private init = async () => {
        const { success, data: organizations } = await ResignApi.getOrganizations();
        if (success) {
            this.setState({ organizations });
            if (organizations.length) {
                const { success: success2, data: coworkers } = await ResignApi.getCoworkers(organizations[0].id);
                if (success2) {
                    this.setState({ selectOrganizationId: organizations[0].id, coworkers });
                }
            }
        }
    };

    private removeOrganization = async (organizationId: string) => {
        const { notify } = this.props;
        const { success, message } = await ResignApi.removeOrganization(organizationId);
        if (!success) {
            notify(message);
        }
    };

    private removeCoworker = async (coworkerId: string) => {
        const { notify } = this.props;
        const { success, message } = await ResignApi.removeCoworker(coworkerId);
        if (!success) {
            notify(message);
        }
    };

    render(): React.ReactNode {
        const { organizations, showEditOrganizationModal, showDeleteOrganizationModal, holdingOrganizationId, selectOrganizationId, coworkers, showEditCoworkerModal, showDeleteCoworkerModal, holdingCoworkerId } = this.state;
        return (
            <React.Fragment>
                <CRow>
                    <CCol sm={12} md={6} className='mx-auto'>
                        <CCard className='mb-4'>
                            <CCardHeader>
                                <div className='d-flex'>
                                    <CIcon size='lg' className='my-auto' icon={cilChevronRight} />
                                    <strong className='ms-2'>組織列表</strong>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <CRow>
                                    <CCol xs={12} className='mb-2 d-grid gap-2 d-md-flex justify-content-md-end'>
                                        <CButtonGroup role='group'>
                                            <CButton
                                                color='info'
                                                variant='outline'
                                                onClick={() => this.setState({ showEditOrganizationModal: 'insert' })}
                                            >
                                                <CIcon icon={cilPlus} className='me-2'></CIcon>
                                                新增
                                            </CButton>
                                        </CButtonGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12}>
                                        <CTable align='middle' responsive hover>
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>編號</CTableHeaderCell>
                                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>組織名稱</CTableHeaderCell>
                                                    <CTableHeaderCell scope='col'></CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {
                                                    organizations.length == 0 &&
                                                    <CTableRow>
                                                        <CTableDataCell colSpan={3} className='text-center'>查無資料</CTableDataCell>
                                                    </CTableRow>
                                                }
                                                {
                                                    organizations.length > 0 &&
                                                    organizations.map((o, oidx) =>
                                                        <CTableRow key={o.id} onClick={() => ResignApi.getCoworkers(o.id).then(({ data: coworkers }) => this.setState({ coworkers, selectOrganizationId: o.id }))}>
                                                            <CTableDataCell className='text-nowrap text-center'>{oidx + 1}</CTableDataCell>
                                                            <CTableDataCell className='text-nowrap text-center'>{o.name}</CTableDataCell>
                                                            <CTableDataCell>
                                                                <CButtonGroup role='group'>
                                                                    <CButton
                                                                        color='info'
                                                                        variant='outline'
                                                                        size='sm'
                                                                        onClick={() => this.setState({ showEditOrganizationModal: 'edit', holdingOrganizationId: o.id })}
                                                                    >
                                                                        <CIcon icon={cilPen}></CIcon>
                                                                    </CButton>
                                                                    {
                                                                        o.deletable &&
                                                                        <CButton
                                                                            color='danger'
                                                                            variant='outline'
                                                                            size='sm'
                                                                            onClick={() => this.setState({ showDeleteOrganizationModal: true, holdingOrganizationId: o.id })}
                                                                        >
                                                                            <CIcon icon={cilTrash}></CIcon>
                                                                        </CButton>
                                                                    }
                                                                </CButtonGroup>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                    )
                                                }
                                            </CTableBody>
                                        </CTable>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol sm={12} md={6} className='mx-auto'>
                        <CCard className='mb-4'>
                            <CCardHeader>
                                <div className='d-flex'>
                                    <CIcon size='lg' className='my-auto' icon={cilChevronRight} />
                                    <strong className='ms-2'>搞事仔列表</strong>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <CRow>
                                    <CCol xs={12} className='mb-2 d-grid gap-2 d-md-flex justify-content-md-end'>
                                        <CInputGroup>
                                            <CFormSelect
                                                value={selectOrganizationId}
                                                id='coworker-organization-id'
                                                onChange={(event: any) => {
                                                    const newVal = event.target.value as string;
                                                    ResignApi.getCoworkers(newVal).then(({ data: coworkers }) => {
                                                        this.setState({ selectOrganizationId: newVal, coworkers });
                                                    });
                                                }}
                                            >
                                                {organizations.map(o => <option key={`coworker-organization-id-${o.id}`} value={o.id}>{o.name}</option>)}
                                            </CFormSelect>
                                            <CButton
                                                color='info'
                                                variant='outline'
                                                onClick={() => this.setState({ showEditCoworkerModal: 'insert' })}
                                            >
                                                <CIcon icon={cilPlus} className='me-2'></CIcon>
                                                新增
                                            </CButton>
                                        </CInputGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12}>
                                        <CTable align='middle' responsive hover>
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>編號</CTableHeaderCell>
                                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>中文名</CTableHeaderCell>
                                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>英文名</CTableHeaderCell>
                                                    <CTableHeaderCell scope='col'></CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {
                                                    coworkers.length == 0 &&
                                                    <CTableRow>
                                                        <CTableDataCell colSpan={4} className='text-center'>查無資料</CTableDataCell>
                                                    </CTableRow>
                                                }
                                                {
                                                    coworkers.length > 0 &&
                                                    coworkers.map((c, cidx) =>
                                                        <CTableRow key={c.id}>
                                                            <CTableDataCell className='text-nowrap text-center'>{cidx + 1}</CTableDataCell>
                                                            <CTableDataCell className='text-nowrap text-center'>{c.name}</CTableDataCell>
                                                            <CTableDataCell className='text-nowrap text-center'>{c.ename}</CTableDataCell>
                                                            <CTableDataCell>
                                                                <CButtonGroup role='group'>
                                                                    <CButton
                                                                        color='info'
                                                                        variant='outline'
                                                                        size='sm'
                                                                        onClick={() => this.setState({ showEditCoworkerModal: 'edit', holdingCoworkerId: c.id })}
                                                                    >
                                                                        <CIcon icon={cilPen}></CIcon>
                                                                    </CButton>
                                                                    {
                                                                        c.deletable &&
                                                                        <CButton
                                                                            color='danger'
                                                                            variant='outline'
                                                                            size='sm'
                                                                            onClick={() => this.setState({ showDeleteCoworkerModal: true, holdingCoworkerId: c.id })}
                                                                        >
                                                                            <CIcon icon={cilTrash}></CIcon>
                                                                        </CButton>
                                                                    }
                                                                </CButtonGroup>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                    )
                                                }
                                            </CTableBody>
                                        </CTable>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <OrganizationModal
                    mode={showEditOrganizationModal}
                    organizationId={holdingOrganizationId}
                    onClose={() => this.setState({ showEditOrganizationModal: '', holdingOrganizationId: '' })}
                    afterSubmit={() => {
                        ResignApi.getOrganizations().then(({ data: organizations }) => this.setState({ organizations }));
                        this.setState({ showEditOrganizationModal: '', holdingOrganizationId: '' });
                    }}
                />
                <AppConfirmModal
                    showModal={showDeleteOrganizationModal}
                    headerText='刪除組織？'
                    onConfirm={async (result: boolean) => {
                        if (result) {
                            await this.removeOrganization(this.state.holdingOrganizationId);
                            ResignApi.getOrganizations().then(({ data: organizations }) => {
                                let { selectOrganizationId } = this.state;
                                if (!organizations.find(o => o.id === selectOrganizationId)) {
                                    if (organizations.length) {
                                        selectOrganizationId = organizations[0].id;
                                        ResignApi.getCoworkers(selectOrganizationId).then(({ data: coworkers }) => this.setState({ coworkers }));
                                    } else {
                                        selectOrganizationId = '';
                                        this.setState({ coworkers: [] });
                                    }
                                }
                                this.setState({ organizations, selectOrganizationId });
                            });
                        }
                        this.setState({ showDeleteOrganizationModal: false, holdingOrganizationId: '' });
                    }}
                />
                <CoworkerModal
                    mode={showEditCoworkerModal}
                    organizationId={selectOrganizationId}
                    coworkerId={holdingCoworkerId}
                    onClose={() => this.setState({ showEditCoworkerModal: '', holdingCoworkerId: '' })}
                    afterSubmit={() => {
                        ResignApi.getCoworkers(selectOrganizationId).then(({ data: coworkers }) => this.setState({ coworkers }));
                        ResignApi.getOrganizations().then(({ data: organizations }) => this.setState({ organizations }));
                        this.setState({ showEditCoworkerModal: '', holdingCoworkerId: '' });
                    }}
                />
                <AppConfirmModal
                    showModal={showDeleteCoworkerModal}
                    headerText='刪除搞事仔？'
                    onConfirm={async (result: boolean) => {
                        if (result) {
                            await this.removeCoworker(this.state.holdingCoworkerId);
                            ResignApi.getCoworkers(selectOrganizationId).then(({ data: coworkers }) => this.setState({ coworkers }));
                            ResignApi.getOrganizations().then(({ data: organizations }) => this.setState({ organizations }));
                        }
                        this.setState({ showDeleteCoworkerModal: false, holdingCoworkerId: '' });
                    }}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => {
    return {
        notify: SetNotifyDispatcher(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoworkerSettingPage);
