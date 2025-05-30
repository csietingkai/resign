import axios from 'axios';
import { COWORKER_PATH, GET_LEADERBOARD_PATH, USER_INFO_PATH, POST_INIT_PATH, STAMP_CARD_PATH, STAMP_CARD_RECORD_PATH, STAMP_CARD_RECORDS_PATH } from './Constant';
import * as AppUtil from '../util/AppUtil';
import { ApiResponse, SimpleResponse } from '../util/Interface';

export interface UserInfo {
    name: string;
    signed: boolean;
    maxStampCnt: number;
}

export interface StampCard {
    id: string;
    userName: string;
    point: number;
}

interface ExtraInfo {
    recordId: string;
    recordDate: string;
}

export interface StampCardInfo extends StampCard {
    extraInfos: ExtraInfo[];
}

export interface StampCardRecord {
    id: string;
    cardId: string;
    date: Date;
    coworkerId: string;
    point: number;
    description?: string;
}

export interface InsertStampCardRecordRequest {
    id: string;
    cardId: string;
    date: string;
    coworkerId: string;
    point: number;
    description?: string;
}

export interface Coworker {
    id: string;
    dept: string;
    name: string;
    ename: string;
    email: string;
    hired: boolean;
}

export interface DeptCoworkerInfo {
    dept: string;
    coworkers: Coworker[];
}

export interface UserInfoResponse extends ApiResponse<UserInfo> { }
export interface StampCardResponse extends ApiResponse<StampCardInfo> { }
export interface StampCardRecordResponse extends ApiResponse<StampCardRecord> { }
export interface StampCardRecordsResponse extends ApiResponse<StampCardRecord[]> { }
export interface DeptCoworkerResponse extends ApiResponse<DeptCoworkerInfo[]> { }
export interface LeadingStampCardsResponse extends ApiResponse<StampCard[]> { }

const getUserInfo = async (): Promise<UserInfoResponse> => {
    const response = await axios.get(USER_INFO_PATH);
    const data: UserInfoResponse = response.data;
    return data;
};

const postInit = async (): Promise<SimpleResponse> => {
    const response = await axios.post(POST_INIT_PATH);
    const data: SimpleResponse = response.data;
    return data;
};

const updateUserInfo = async (maxStampCnt: number): Promise<SimpleResponse> => {
    const response = await axios.post(USER_INFO_PATH, { maxStampCnt });
    const data: SimpleResponse = response.data;
    return data;
};

const getStampCardInfo = async (): Promise<StampCardResponse> => {
    const response = await axios.get(STAMP_CARD_PATH);
    const data: StampCardResponse = response.data;
    return data;
};

const fetchStampCardRecord = async (id: string): Promise<StampCardRecordResponse> => {
    const response = await axios.get(STAMP_CARD_RECORD_PATH, { params: { id } });
    const data: StampCardRecordResponse = response.data;
    return data;
};

const insertStampCardRecord = async (stampCardRecord: InsertStampCardRecordRequest): Promise<SimpleResponse> => {
    const response = await axios.post(STAMP_CARD_RECORD_PATH, stampCardRecord);
    const data: SimpleResponse = response.data;
    return data;
};

const removeStampCardRecord = async (recordId: string): Promise<SimpleResponse> => {
    const response = await axios.delete(STAMP_CARD_RECORD_PATH, { params: { recordId } });
    const data: SimpleResponse = response.data;
    return data;
};

const fetchStampCardRecords = async (startDate?: Date, endDate?: Date, dept?: string, coworkerId?: string): Promise<StampCardRecordsResponse> => {
    const params: any = { dept, coworkerId };
    if (!isNaN((startDate as any)?.getTime())) {
        params.startDate = AppUtil.toDateStr(startDate, 'YYYY-MM-DD') || '';
    }
    if (!isNaN((endDate as any)?.getTime())) {
        params.endDate = AppUtil.toDateStr(endDate, 'YYYY-MM-DD') || '';
    }
    const response = await axios.get(STAMP_CARD_RECORDS_PATH, { params });
    const data: StampCardRecordsResponse = response.data;
    return data;
};

const getDeptCoworkerOptions = async (): Promise<DeptCoworkerResponse> => {
    const response = await axios.get(COWORKER_PATH);
    const data: DeptCoworkerResponse = response.data;
    return data;
};

const getLeading = async (size: number = 5): Promise<LeadingStampCardsResponse> => {
    const response = await axios.get(GET_LEADERBOARD_PATH, { params: { size } });
    const data: LeadingStampCardsResponse = response.data;
    return data;
};

export default { getUserInfo, postInit, updateUserInfo, getStampCardInfo, fetchStampCardRecord, insertStampCardRecord, removeStampCardRecord, fetchStampCardRecords, getDeptCoworkerOptions, getLeading };
