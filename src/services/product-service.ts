import { Product } from "../models";

export const productService = {
    async getTopFiveOf(top: "date" | "price" | "most-bids"): Promise<Product[]> {
        return [];
    },
};
