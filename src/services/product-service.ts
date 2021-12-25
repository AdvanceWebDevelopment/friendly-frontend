import axios from "axios";
import { API_HOST } from "../constants/api-routes";
import { Product } from "../models";

export const productService = {
    async getTopFiveOf(top: "date" | "price" | "most-bids"): Promise<Product[]> {
        const response = (await axios.get(`${API_HOST}/products?top=${top}`)) as any;
        return response.data?.map((item: any) => Product.fromData(item));
    },
};
