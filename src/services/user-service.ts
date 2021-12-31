import axios from "axios";
import { apiRoute, API_HOST } from "../constants";
import { User } from "../models";
import { authUtils } from "../utils";

export const userService = {
    async getUser(): Promise<User> {
        const response = await axios.get(`${API_HOST}/${apiRoute.USER}`, {
            headers: authUtils.getAuthHeader(),
        });

        return User.fromData(response.data);
    },
    async updateUser(user: User): Promise<boolean> {
        try {
            const requestData = {
                name: user.name,
                dateOfBirth: user.dob,
                email: user.email,
            };

            const response = await axios.patch(`${API_HOST}/${apiRoute.USER}`, requestData, {
                headers: authUtils.getAuthHeader(),
            });

            const newAccessToken = response.data.responseHeader?.accessToken;

            if (newAccessToken !== undefined && newAccessToken !== null) {
                authUtils.updateAccessToken(newAccessToken);
            }

            return true;
        } catch (error) {
            return false;
        }
    },
};
