import axios from "axios";
import { API_HOST } from "../constants/api-routes";
import { LoginRequest, LoginResponse } from "../app/reducers/auth-slice";

export const authService = {
    async login(res: LoginRequest): Promise<LoginResponse> {
        const response = (await axios.post(`${API_HOST}/auth/login`, res)) as any;
        return response.data;
    },
};
