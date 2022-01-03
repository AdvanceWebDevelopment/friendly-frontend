import axios from "axios";
import { API_HOST } from "../constants/api-routes";
import { ErrorResponse, LoginRequest, LoginResponse } from "../app/reducers/auth-slice";

export const authService = {
    async login(req: LoginRequest): Promise<LoginResponse | ErrorResponse> {
        try {
            const response = (await axios.post(`${API_HOST}/auth/login`, req)) as any;
            return response.data;
        } catch (e: any) {
            console.error(e?.response?.data);
            return e?.response?.data;
        }
    },
};
