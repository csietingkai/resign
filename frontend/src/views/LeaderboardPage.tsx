import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { SetNotifyDispatcher } from '../reducer/PropsMapper';
import { ReduxState } from '../reducer/Selector';
import { Action } from '../util/Interface';
import { CCard, CCardBody, CCol, CContainer, CListGroup, CListGroupItem, CNav, CNavItem, CNavLink, CRow, CTabContent, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTabPane } from '@coreui/react';
import ResignApi, { ByCoworker, ByPoint, StampCard } from '../api/resign';

export interface LeaderboardPageProps {
}

export interface LeaderboardPageState {
    activeTab: 'points' | 'coworkers';
    points: ByPoint[];
    coworkers: ByCoworker[];
}

class LeaderboardPage extends React.Component<LeaderboardPageProps, LeaderboardPageState> {

    constructor(props: LeaderboardPageProps) {
        super(props);
        this.state = {
            activeTab: 'points',
            points: [],
            coworkers: []
        };
        this.init();
    }

    private init = async () => {
        const { data: { byPoints, byCoworkers } } = await ResignApi.getLeaderboard();
        this.setState({ points: byPoints, coworkers: byCoworkers });
    };

    private getRankColor = (rank: number) => {
        const color = [ '#FFD700', '#C0C0C0', '#CD7F32' ];
        return color[rank] ? { backgroundColor: color[rank] } : {};
    }

    render(): React.ReactNode {
        const { activeTab, points, coworkers } = this.state;
        return (
            <React.Fragment>
                <CNav variant='pills' layout='fill' className='pb-2 border-bottom border-secondary border-bottom-2'>
                    <CNavItem>
                        <CNavLink active={activeTab === 'points'} onClick={() => this.setState({ activeTab: 'points' })}>
                            怨念排行
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink active={activeTab === 'coworkers'} onClick={() => this.setState({ activeTab: 'coworkers' })}>
                            搞事仔排行
                        </CNavLink>
                    </CNavItem>
                </CNav>
                <CTabContent>
                    <CTabPane visible={activeTab === 'points'} className='mt-2 col-xl-8 mx-auto'>
                        <CTable className='leaderboard' align='middle' responsive hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>排名</CTableHeaderCell>
                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>姓名</CTableHeaderCell>
                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>怨念值</CTableHeaderCell>
                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>離職進度</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    points.length == 0 &&
                                    <CTableRow>
                                        <CTableDataCell colSpan={5} className='text-center'>查無資料</CTableDataCell>
                                    </CTableRow>
                                }
                                {
                                    points.length > 0 &&
                                    points.map((p, pidx) =>
                                        <CTableRow key={p.id}>
                                            <CTableDataCell className='text-nowrap text-center' style={this.getRankColor(pidx)}>{pidx + 1}</CTableDataCell>
                                            <CTableDataCell className='text-nowrap text-center'>{p.name}</CTableDataCell>
                                            <CTableDataCell className='text-nowrap text-center'>{p.point} / {p.total}</CTableDataCell>
                                            <CTableDataCell className='text-nowrap text-center'>{p.progress * 100}%</CTableDataCell>
                                        </CTableRow>
                                    )
                                }
                            </CTableBody>
                        </CTable>
                    </CTabPane>
                    <CTabPane visible={activeTab === 'coworkers'} className='mt-2 col-xl-8 mx-auto'>
                        <CTable align='middle' responsive hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>排名</CTableHeaderCell>
                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>搞事仔</CTableHeaderCell>
                                    <CTableHeaderCell scope='col' className='text-nowrap text-center'>怨念值</CTableHeaderCell>
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
                                            <CTableDataCell className='text-nowrap text-center' style={this.getRankColor(cidx)}>{cidx + 1}</CTableDataCell>
                                            <CTableDataCell className='text-nowrap text-center'>{c.name}</CTableDataCell>
                                            <CTableDataCell className='text-nowrap text-center'>{c.point}</CTableDataCell>
                                        </CTableRow>
                                    )
                                }
                            </CTableBody>
                        </CTable>
                    </CTabPane>
                </CTabContent>
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
