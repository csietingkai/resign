import axios from 'axios';
import { COWORKER_PATH, GET_LEADERBOARD_PATH, GET_USER_INFO_PATH, POST_INIT_PATH, STAMP_CARD_PATH, STAMP_CARD_RECORD_PATH } from './Constant';
import { ApiResponse, SimpleResponse } from '../util/Interface';

export interface UserInfo {
    name: string;
    signed: boolean;
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
    coworkers: Coworker[]
}

export interface UserInfoResponse extends ApiResponse<UserInfo> { }
export interface StampCardResponse extends ApiResponse<StampCardInfo> { }
export interface StampCardRecordResponse extends ApiResponse<StampCardRecord> { }
export interface DeptCoworkerResponse extends ApiResponse<DeptCoworkerInfo[]> { }
export interface LeadingStampCardsResponse extends ApiResponse<StampCard[]> { }

const getUserInfo = async (): Promise<UserInfoResponse> => {
    const response = await axios.get(GET_USER_INFO_PATH);
    const data: UserInfoResponse = response.data;
    return data;
}

const postInit = async (): Promise<SimpleResponse> => {
    const response = await axios.post(POST_INIT_PATH);
    const data: SimpleResponse = response.data;
    return data;
}

const getStampCardInfo = async (): Promise<StampCardResponse> => {
    const response = await axios.get(STAMP_CARD_PATH);
    const data: StampCardResponse = response.data;
    return data;
}

const fetchStampCardRecord = async (id: string): Promise<StampCardRecordResponse> => {
    const response = await axios.get(STAMP_CARD_RECORD_PATH, { params: {id}});
    const data: StampCardRecordResponse = response.data;
    return data;
}

const insertStampCardRecord = async (stampCardRecord: InsertStampCardRecordRequest): Promise<SimpleResponse> => {
    const response = await axios.post(STAMP_CARD_RECORD_PATH, stampCardRecord);
    const data: SimpleResponse = response.data;
    return data;
}

const getDeptCoworkerOptions = async (): Promise<DeptCoworkerResponse> => {
    const response = await axios.get(COWORKER_PATH);
    const data: DeptCoworkerResponse = response.data;
    return data;
}

const getLeading = async (size: number = 5): Promise<LeadingStampCardsResponse> => {
    const response = await axios.get(GET_LEADERBOARD_PATH, { params: { size } });
    const data: LeadingStampCardsResponse = response.data;
    return data;
}

export default { getUserInfo, postInit, getStampCardInfo, fetchStampCardRecord, insertStampCardRecord, getDeptCoworkerOptions, getLeading };
