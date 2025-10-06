import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilAnimal, cilBank, cilCart, cilChart, cilCode, cilCog, cilDollar, cilList, cilMonitor, cilSearch, cilSpeedometer, cilSwapHorizontal } from '@coreui/icons';

export type RouteItem = {
    type: 'item';
    name: string;
    path: string;
    icon: React.ReactNode;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
};

export type RouteParentItem = {
    type: 'parent';
    name: string;
    path: string;
    icon: React.ReactNode;
    items: RouteChildItem[];
};

export type RouteChildItem = {
    type: 'child';
    name: string;
    path: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
};

export type RouteLink = {
    type: 'link';
    name: string;
    href: string;
    icon: React.ReactNode;
};

export type RouteTitle = {
    type: 'title';
    name: string,
};

export type Route = RouteItem | RouteParentItem | RouteChildItem | RouteLink | RouteTitle;

const routes: Route[] = [
    {
        type: 'item',
        name: '你的集點卡',
        path: 'dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName='nav-icon' />,
        component: React.lazy(() => import('./views/Dashboard'))
    },
    {
        type: 'item',
        name: '集點紀錄',
        path: 'stampRecord',
        icon: <CIcon icon={cilList} customClassName='nav-icon' />,
        component: React.lazy(() => import('./views/StampRecordPage'))
    },
    {
        type: 'item',
        name: '排行榜',
        path: 'leaderboard',
        icon: <CIcon icon={cilChart} customClassName='nav-icon' />,
        component: React.lazy(() => import('./views/LeaderboardPage'))
    },
    {
        type: 'item',
        name: '搞事仔設定',
        path: 'coworkerSetting',
        icon: <CIcon icon={cilAnimal} customClassName='nav-icon' />,
        component: React.lazy(() => import('./views/CoworkerSettingPage'))
    },
    {
        type: 'item',
        name: '使用者設定',
        path: 'setting',
        icon: <CIcon icon={cilCog} customClassName='nav-icon' />,
        component: React.lazy(() => import('./views/SettingPage'))
    },
    {
        type: 'link',
        name: 'Source Code',
        href: 'https://github.com/csietingkai/resign',
        icon: <CIcon icon={cilCode} customClassName='nav-icon' />
    }
];

export default routes;
