import axios from "axios";
import { apiRoute, API_HOST } from "../constants";
import { Product, User } from "../models";
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
    async getUserSellingProducts(): Promise<Product[] | undefined> {
        try {
            const response = await axios.get(`${API_HOST}/${apiRoute.SELLER}/${apiRoute.PRODUCTS}`, {
                headers: authUtils.getAuthHeader(),
                params: {
                    page: 0,
                    size: 99,
                },
            });

            const products: Product[] = response.data?.responseBody?.content?.map((product: Product) =>
                Product.fromData(product),
            );

            return products;
        } catch (error: any) {
            console.log(error?.response?.data);
            return undefined;
        }
    },
};
