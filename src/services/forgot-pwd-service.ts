import axios from "axios";
import {
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    OtpRequest,
    OtpResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
} from "../app/reducers/forgot-pwd-slice";
import { API_HOST } from "../constants/api-routes";

export const forgotPasswordService = {
    async getOtp(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
        try {
            const response = (await axios.post(`${API_HOST}/auth/forgot-password`, req)) as any;
            return response.data;
        } catch (error: any) {
            console.error(error?.response?.data);
            return error?.response?.data;
        }
    },

    async sendOtp(req: OtpRequest): Promise<OtpResponse> {
        try {
            const response = (await axios.post(`${API_HOST}/auth/verify`, req)) as any;
            return response.data;
        } catch (error: any) {
            console.error(error?.response?.data);
            return error?.response?.data;
        }
    },

    async resetPassword(req: ResetPasswordRequest): Promise<ResetPasswordResponse> {
        try {
            const response = (await axios.post(`${API_HOST}/auth/reset-password`, req)) as any;
            return response.data;
        } catch (error: any) {
            console.error(error?.response?.data);
            return error?.response?.data;
        }
    },
};
