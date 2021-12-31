import { authConstants } from "../constants";

export const authUtils = {
    getAuthHeader() {
        return {
            Authorization: "Bearer " + localStorage.getItem(authConstants.ACCESS_TOKEN),
            "refresh-token": localStorage.getItem(authConstants.REFRESH_TOKEN)!,
        };
    },
    updateAccessToken(accessToken: string) {
        localStorage.setItem(authConstants.ACCESS_TOKEN, accessToken);
    },
};
