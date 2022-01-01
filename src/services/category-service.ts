import axios from "axios";
import { apiRoute, API_HOST } from "../constants/api-routes";
import { Product } from "../models";
import { Category } from "../models/category";

export const categoryService = {
    async getCategories() {
        const response = await axios.get(`${API_HOST}/${apiRoute.CATEGORY}`);
        const categories = response?.data?.map((item: Category) => Category.fromData(item));

        return categories;
    },
    async getProductByCategoryId(id: number = 1, pageNumber: number) {
        const response = (await axios.get(`${API_HOST}/category/${id}/products?page=${pageNumber}&size=12`)) as any;
        const products: Product[] = response?.data?.content.map((item: any) => {
            return Product.fromData(item);
        });
        const totalPages: number = response?.data?.totalPages;

        return {
            products,
            totalPages,
        };
    },
};
