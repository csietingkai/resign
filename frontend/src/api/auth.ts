import axios from 'axios';
import { AUTH_LOGIN_PATH, AUTH_LOGOUT_PATH, AUTH_CHANGE_PWD_PATH, AUTH_VALIDATE_PATH } from './Constant';
import { ApiResponse } from '../util/Interface';

export interface AuthToken {
    id: string;
    name: string;
    role: string;
    tokenString: string;
    expiryDate: Date;
}

export interface AuthResponse extends ApiResponse<AuthToken> { }

const login = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post(AUTH_LOGIN_PATH, null, { params: { username, password } });
    const data: AuthResponse = response.data;
    return data;
};

const changePwd = async (password: string): Promise<AuthResponse> => {
    const response = await axios.post(AUTH_CHANGE_PWD_PATH, null, { params: { password } });
    const data: AuthResponse = response.data;
    return data;
};

const validate = async (tokenString: string): Promise<AuthResponse> => {
    const response = await axios.get(AUTH_VALIDATE_PATH, { params: { tokenString } });
    const data: AuthResponse = response.data;
    return data;
};

const logout = async (tokenString: string): Promise<AuthResponse> => {
    const response = await axios.post(AUTH_LOGOUT_PATH, null, { params: { tokenString } });
    const data: AuthResponse = response.data;
    return data;
};

export default { login, changePwd, validate, logout };
