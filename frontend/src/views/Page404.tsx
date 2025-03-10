import React from 'react';
import { connect } from 'react-redux';
import { CCol, CContainer, CRow } from '@coreui/react';

export interface Page404Props { }

export interface Page404State { }

class Page404 extends React.Component<Page404Props, Page404State> {
    render(): React.ReactNode {
        return (
            <div className='bg-body-tertiary min-vh-100 d-flex flex-row align-items-center'>
                <CContainer>
                    <CRow className='justify-content-center'>
                        <CCol md={6}>
                            <div className='clearfix'>
                                <h1 className='float-start display-3 me-4'>404</h1>
                                <h4 className='pt-3'>Oops! You're lost.</h4>
                                <p className='text-body-secondary float-start'>
                                    The page you are looking for was not found.
                                </p>
                            </div>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        );
    }
}

export default connect()(Page404);
