import axios from "axios";
import { API_HOST } from "../constants/api-routes";
import { Product } from "../models";
import { Category } from "../models/category";

export const categoryService = {
    getCategories() {
        const dummyData: Category[] = [
            { id: 1, name: "Tất Cả" },
            {
                id: 2,
                name: "Điện Tử",
                subCategories: [
                    { id: 1, name: "Laptop" },
                    { id: 2, name: "Smart Phone" },
                ],
            },
            {
                id: 3,
                name: "Phụ Kiện",
                subCategories: [
                    { id: 3, name: "Đồng Hồ" },
                    { id: 4, name: "Thắt Lưng" },
                ],
            },
            {
                id: 4,
                name: "Nội Thất",
                subCategories: [
                    { id: 5, name: "Giường" },
                    { id: 6, name: "Bàn Ghế" },
                ],
            },
            {
                id: 5,
                name: "Trang Sức",
                subCategories: [
                    { id: 7, name: "Nhẫn" },
                    { id: 8, name: "Vòng Cổ" },
                ],
            },
            {
                id: 6,
                name: "Tranh Vẽ",
                subCategories: [
                    { id: 9, name: "Kỹ Thuật Số" },
                    { id: 10, name: "Hiện Vật" },
                ],
            },
            {
                id: 7,
                name: "Phương Tiện",
                subCategories: [
                    { id: 11, name: "Xe Hơi" },
                    { id: 12, name: "Tàu Bè" },
                ],
            },
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
