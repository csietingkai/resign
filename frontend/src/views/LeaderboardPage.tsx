import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { SetNotifyDispatcher } from '../reducer/PropsMapper';
import { getLeadingStampCards, ReduxState } from '../reducer/Selector';
import { Action } from '../util/Interface';
import { CCard, CCardBody, CCol, CContainer, CListGroup, CListGroupItem, CRow, CTabContent, CTabPane } from '@coreui/react';
import { StampCard } from '../api/resign';

export interface LeaderboardPageProps {
    stampCards: StampCard[];
}

export interface LeaderboardPageState { }

class LeaderboardPage extends React.Component<LeaderboardPageProps, LeaderboardPageState> {

    constructor(props: LeaderboardPageProps) {
        super(props);
        this.state = {
        };
    }

    render(): React.ReactNode {
        const { stampCards } = this.props;
        return (
            <React.Fragment>
                <CRow>
                    <CCol sm={12} md={9} className='mx-auto text-center'>
                        <h2>排行榜</h2>
                        <CCard>
                            <CCardBody>
                                <CContainer style={{ backgroundColor: 'var(--cui-tertiary-bg)' }}>
                                    <CRow>
                                        <CCol sm={12} md={10} lg={8} className='mx-auto'>
                                            <CTabContent className='rounded-bottom' style={{ backgroundColor: 'var(--cui-tertiary-bg)' }}>
                                                <CTabPane className='p-3 preview' visible>
                                                    <CListGroup>
                                                        {
                                                            stampCards.map((c, idx) => <CListGroupItem key={`leader-board-${idx}`}>{c.userName} {c.point}</CListGroupItem>)
                                                        }
                                                    </CListGroup>
                                                </CTabPane>
                                            </CTabContent>
                                        </CCol>
                                    </CRow>

                                </CContainer>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </React.Fragment>
        );
    }
} const mapStateToProps = (state: ReduxState) => {
    return {
        stampCards: getLeadingStampCards(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => {
    return {
        notify: SetNotifyDispatcher(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPage);
