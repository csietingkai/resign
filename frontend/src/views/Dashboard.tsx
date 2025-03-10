import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { SetNotifyDispatcher } from '../reducer/PropsMapper';
import { ReduxState } from '../reducer/Selector';
import { Action } from '../util/Interface';

export interface DashboardProps {
}

export interface DashboardState {
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
