import axios from 'axios';
import { RESIGN_GET_LEADERBOARD_PATH, RESIGN_GET_USERINFO_PATH, RESIGN_POST_INIT_PATH } from './Constant';
import { ApiResponse, SimpleResponse } from '../util/Interface';

export interface UserInfo {
    name: string;
    signed: boolean;
}

export interface StampCard {
    userName: string;
    point: number;
}

export interface UserInfoResponse extends ApiResponse<UserInfo> { }
export interface LeadingStampCardsResponse extends ApiResponse<StampCard[]> { }

const getUserInfo = async (): Promise<UserInfoResponse> => {
    const response = await axios.get(RESIGN_GET_USERINFO_PATH);
    const data: UserInfoResponse = response.data;
    return data;
}

const postInit = async (): Promise<SimpleResponse> => {
    const response = await axios.post(RESIGN_POST_INIT_PATH);
    const data: SimpleResponse = response.data;
    return data;
}

const getLeading = async (size: number = 5): Promise<LeadingStampCardsResponse> => {
    const response = await axios.get(RESIGN_GET_LEADERBOARD_PATH, { params: { size } });
    const data: LeadingStampCardsResponse = response.data;
    return data;
}

export default { getUserInfo, postInit, getLeading };
