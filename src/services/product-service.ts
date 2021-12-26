import axios from "axios";
import { API_HOST } from "../constants/api-routes";
import { Product } from "../models";

export const productService = {
    async getTopFiveOf(top: "date" | "price" | "most-bids"): Promise<Product[]> {
        const response = (await axios.get(`${API_HOST}/products?top=${top}`)) as any;
        return response.data?.map((item: any) => Product.fromData(item));
    },
    async getProductById(id: number) {
        const response = (await axios.get(`${API_HOST}/product/${id}`)) as any;
        return {
            product: Product.fromData(response.data?.product),
            relatedProducts: response.data?.products?.content?.map((item: any) => Product.fromData(item)) as Product[],
        };
    },
};
