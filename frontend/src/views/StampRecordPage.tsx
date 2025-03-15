import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { SetNotifyDispatcher } from '../reducer/PropsMapper';
import { ReduxState } from '../reducer/Selector';
import { Action } from '../util/Interface';
import { CCard, CCardBody, CCol, CForm, CRow, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react';

export interface StampRecordPageProps {
}

export interface StampRecordPageState {
}

class StampRecordPage extends React.Component<StampRecordPageProps, StampRecordPageState> {

    constructor(props: StampRecordPageProps) {
        super(props);
        this.state = {
        };
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(StampRecordPage);
