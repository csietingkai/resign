import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { SetNotifyDispatcher } from '../reducer/PropsMapper';
import { ReduxState } from '../reducer/Selector';
import { Action } from '../util/Interface';
import { CCard, CCardBody, CCol, CForm, CRow, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';

export interface DashboardProps {
}

export interface DashboardState {
    cnt: number;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            cnt: 100
        };
    }

    private init = async () => {

    };

    private renderStamps = (): React.ReactNode[] => {
        const { cnt } = this.state;
        const cubes: React.ReactNode[] = [];
        for (let i = 0; i < cnt; i++) {
            cubes.push(
                <CCol xs={1} key={`cell-${i}`}>
                    <CCard>
                        <CCardBody className='align-items-center' style={{ padding: '0.75rem 0.75rem' }}>
                            <div className='text-white p-2' style={{ backgroundColor: 'var(--cui-gray-300)' }}>
                                <div className='mt-2 mb-2 text-center'>{i+1}</div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            );
        }
        return cubes;
    };

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <CRow className='mb-4' xs={{ gutter: 4 }}>
                    {this.renderStamps()}
                </CRow>
            </React.Fragment>
        );
    }
} const mapStateToProps = (state: ReduxState) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => {
    return {
        notify: SetNotifyDispatcher(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
