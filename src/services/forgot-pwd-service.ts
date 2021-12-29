import axios from "axios";
import { API_HOST } from "../constants/api-routes";
import { LoginRequest, LoginResponse } from "../app/reducers/auth-slice";
import { ForgotPasswordRequest, ForgotPasswordResponse, STATUS } from "../app/reducers/forgot-pwd-slice";

export const forgotPasswordService = {
    async getOtp(res: ForgotPasswordRequest): Promise<STATUS> {
        try {
            const response = (await axios.post(`${API_HOST}/auth/forgot-password`, res)) as any;
            console.log(response);
            return response.data.status;
        } catch (error) {
            return STATUS.FAILED;
        }
    },
};
