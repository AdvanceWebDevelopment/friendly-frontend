import axios from "axios";
import { API_HOST } from "../constants/api-routes";
import { ActivateRequest, ActivateResponse, RegisterRequest, RegisterResponse } from "../app/reducers/register-slice";

export const registerService = {
    async register(req: RegisterRequest): Promise<RegisterResponse> {
        try {
            const response = (await axios.post(`${API_HOST}/auth/regiser`, req)) as any;
            return response.data;
        } catch (error: any) {
            return error?.response?.data;
        }
    },

    async activate(req: ActivateRequest): Promise<ActivateResponse> {
        try {
            const response = (await axios.post(`${API_HOST}/auth/verify`)) as any;
            return response.data;
        } catch (error: any) {
            return error?.response?.data;
        }
    },
};
