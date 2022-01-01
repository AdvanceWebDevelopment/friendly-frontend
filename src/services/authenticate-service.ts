import axios from "axios";
import { API_HOST } from "../constants/api-routes";
import { LoginRequest, LoginResponse } from "../app/reducers/auth-slice";

export const authService = {
    async login(req: LoginRequest): Promise<LoginResponse> {
        const response = (await axios.post(`${API_HOST}/auth/login`, req)) as any;
        console.log(`From login service: ${JSON.stringify(response)}`);
        return response.data;
    },
};
