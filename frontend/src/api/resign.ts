import axios from 'axios';
import { USER_INFO_PATH, POST_INIT_PATH, STAMP_CARD_RECORD_PATH, STAMP_CARD_RECORDS_PATH, ORG_COWORKER_PATH, STAMP_CARD_PATH, ORGANIZATIONS_PATH, COWORKERS_PATH, ORGANIZATION_PATH, COWORKER_PATH } from './Constant';
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

export interface StampCardRecord {
    id: string;
    cardId: string;
    date: Date;
    coworkerId: string;
    point: number;
    description?: string;
}

export interface StampCardRecordVo extends StampCardRecord {
    organizationId: string;
    organizationName: string;
    coworkerName: string;
}

export interface InsertStampCardRecordRequest {
    cardId: string;
    date: string;
    coworkerId: string;
    point: number;
    description?: string;
}

export interface UpdateStampCardRecordRequest extends InsertStampCardRecordRequest {
    id: string;
}

export interface Coworker {
    id: string;
    organizationId: string;
    name: string;
    ename: string;
}

export interface CoworkerVo extends Coworker {
    deletable: boolean;
}

export interface Organization {
    id: string;
    name: string;
}

export interface OrganizationVo extends Organization {
    deletable: boolean;
}

export interface OrganizationCoworkerInfo {
    orgId: string;
    orgName: string;
    coworkers: Coworker[];
}

export interface UserInfoResponse extends ApiResponse<UserInfo> { }
export interface StampCardResponse extends ApiResponse<StampCard> { }
export interface StampCardRecordResponse extends ApiResponse<StampCardRecordVo> { }
export interface StampCardRecordsResponse extends ApiResponse<StampCardRecordVo[]> { }
export interface OrganizationsResponse extends ApiResponse<OrganizationVo[]> { }
export interface OrganizationResponse extends ApiResponse<Organization> { }
export interface CoworkersResponse extends ApiResponse<CoworkerVo[]> { }
export interface CoworkerResponse extends ApiResponse<Coworker> { }
export interface OrgCoworkerInfosResponse extends ApiResponse<OrganizationCoworkerInfo[]> { }

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

const getStampCard = async (): Promise<StampCardResponse> => {
    const response = await axios.get(STAMP_CARD_PATH);
    const data: StampCardResponse = response.data;
    return data;
};

const getStampCardRecord = async (recordId: string): Promise<StampCardRecordResponse> => {
    const response = await axios.get(STAMP_CARD_RECORD_PATH, { params: { recordId } });
    const data: StampCardRecordResponse = response.data;
    return data;
};

const getOrganizations = async (): Promise<OrganizationsResponse> => {
    const repsonse = await axios.get(ORGANIZATIONS_PATH);
    const data: OrganizationsResponse = repsonse.data;
    return data;
};

const getOrganization = async (organizationId: string): Promise<OrganizationResponse> => {
    const repsonse = await axios.get(ORGANIZATION_PATH, { params: { organizationId } });
    const data: OrganizationResponse = repsonse.data;
    return data;
};

const insertOrganization = async (organization: Organization): Promise<SimpleResponse> => {
    const response = await axios.post(ORGANIZATION_PATH, organization);
    const data: SimpleResponse = response.data;
    return data;
};

const updateOrganization = async (organization: Organization): Promise<SimpleResponse> => {
    const response = await axios.patch(ORGANIZATION_PATH, organization);
    const data: SimpleResponse = response.data;
    return data;
};

const removeOrganization = async (organizationId: string): Promise<SimpleResponse> => {
    const response = await axios.delete(ORGANIZATION_PATH, { params: { organizationId } });
    const data: SimpleResponse = response.data;
    return data;
};

const getCoworkers = async (organizationId: string): Promise<CoworkersResponse> => {
    const response = await axios.get(COWORKERS_PATH, { params: { organizationId } });
    const data: CoworkersResponse = response.data;
    return data;
};

const getCoworker = async (coworkerId: string): Promise<CoworkerResponse> => {
    const repsonse = await axios.get(COWORKER_PATH, { params: { coworkerId } });
    const data: CoworkerResponse = repsonse.data;
    return data;
};

const insertCoworker = async (organization: Organization): Promise<SimpleResponse> => {
    const response = await axios.post(COWORKER_PATH, organization);
    const data: SimpleResponse = response.data;
    return data;
};

const updateCoworker = async (organization: Organization): Promise<SimpleResponse> => {
    const response = await axios.patch(COWORKER_PATH, organization);
    const data: SimpleResponse = response.data;
    return data;
};

const removeCoworker = async (coworkerId: string): Promise<SimpleResponse> => {
    const response = await axios.delete(COWORKER_PATH, { params: { coworkerId } });
    const data: SimpleResponse = response.data;
    return data;
};

const getOrgCoworkerOptions = async (): Promise<OrgCoworkerInfosResponse> => {
    const response = await axios.get(ORG_COWORKER_PATH);
    const data: OrgCoworkerInfosResponse = response.data;
    return data;
};

const insertStampCardRecord = async (stampCardRecord: InsertStampCardRecordRequest): Promise<SimpleResponse> => {
    const response = await axios.post(STAMP_CARD_RECORD_PATH, stampCardRecord);
    const data: SimpleResponse = response.data;
    return data;
};

const updateStampCardRecord = async (stampCardRecord: UpdateStampCardRecordRequest): Promise<SimpleResponse> => {
    const response = await axios.patch(STAMP_CARD_RECORD_PATH, stampCardRecord);
    const data: SimpleResponse = response.data;
    return data;
};

const removeStampCardRecord = async (recordId: string): Promise<SimpleResponse> => {
    const response = await axios.delete(STAMP_CARD_RECORD_PATH, { params: { recordId } });
    const data: SimpleResponse = response.data;
    return data;
};

const getStampCardRecords = async (startDate?: Date, endDate?: Date, coworkerId?: string): Promise<StampCardRecordsResponse> => {
    const params: any = { coworkerId };
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

export default { getUserInfo, postInit, updateUserInfo, getStampCard, getStampCardRecord, insertStampCardRecord, updateStampCardRecord, removeStampCardRecord, getStampCardRecords, getOrganizations, getOrganization, insertOrganization, updateOrganization, removeOrganization, getCoworkers, getCoworker, insertCoworker, updateCoworker, removeCoworker, getOrgCoworkerOptions };
