import axios from "axios";
import { API_HOST } from "../constants/api-routes";
import { Product } from "../models";
import { Category } from "../models/category";

export const categoryService = {
    getCategories() {
        const dummyData: Category[] = [
            new Category(1, "Tất Cả"),
            new Category(2, "Điện Tử"),
            new Category(3, "Phụ Kiện"),
            new Category(4, "Nội Thất"),
            new Category(5, "Trang Sức"),
            new Category(6, "Tranh Vẽ"),
            new Category(7, "Phương Tiện Di Chuyển"),
        ];

        return dummyData;
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
