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
};
