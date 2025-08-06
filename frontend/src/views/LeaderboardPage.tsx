import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { SetNotifyDispatcher } from '../reducer/PropsMapper';
import { ReduxState } from '../reducer/Selector';
import { Action } from '../util/Interface';
import { CCard, CCardBody, CCol, CContainer, CListGroup, CListGroupItem, CRow, CTabContent, CTabPane } from '@coreui/react';
import { StampCard } from '../api/resign';

export interface LeaderboardPageProps {
}

export interface LeaderboardPageState { }

class LeaderboardPage extends React.Component<LeaderboardPageProps, LeaderboardPageState> {

    constructor(props: LeaderboardPageProps) {
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

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPage);
