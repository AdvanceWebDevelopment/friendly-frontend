import axios from "axios";
import { apiRoute, API_HOST } from "../constants/api-routes";
import { Product, SubCategory } from "../models";
import { Category } from "../models/category";
import { authUtils } from "../utils";

export interface AddSubCategoryRequest {
    category: Category;
    subCategory: SubCategory;
}

export const categoryService = {
    async getCategories() {
        const response = await axios.get(`${API_HOST}/${apiRoute.CATEGORY}`);
        const categories = response?.data?.map((item: Category) => Category.fromData(item));

        return categories;
    },
    async getProductByCategoryId(id: number = 1, pageNumber: number) {
        const response = (await axios.get(
            `${API_HOST}/${apiRoute.CATEGORY}/${id}/products?page=${pageNumber}&size=12`,
        )) as any;
        const products: Product[] = response?.data?.content.map((item: any) => {
            return Product.fromData(item);
        });
        const totalPages: number = response?.data?.totalPages;

        return {
            products,
            totalPages,
        };
    },
    async addCategory(category: Category): Promise<Category | undefined> {
        try {
            const request = {
                name: category.name,
                subCategories: [],
            };

            const response = await axios.post(`${API_HOST}/${apiRoute.ADMIN}/${apiRoute.CATEGORY}`, request, {
                headers: authUtils.getAuthHeader(),
            });

            const accessToken = response.data?.responseHeader?.accessToken;
            if (accessToken) {
                authUtils.updateAccessToken(accessToken);
            }

            return category;
        } catch (error: any) {
            console.error(error?.response?.data);
            return undefined;
        }
    },
    async updateCategory(category: Category): Promise<Category | undefined> {
        try {
            const response = await axios.put(
                `${API_HOST}/${apiRoute.ADMIN}/${apiRoute.CATEGORY}/${category.id}`,
                {
                    name: category.name,
                    subCategories: [],
                },
                {
                    headers: authUtils.getAuthHeader(),
                },
            );

            const accessToken = response.data?.responseHeader?.accessToken;
            if (accessToken) {
                authUtils.updateAccessToken(accessToken);
            }

            return category;
        } catch (error: any) {
            console.error(error.response?.data);
            return undefined;
        }
    },
    async deleteCategory(category: Category): Promise<Category | undefined> {
        try {
            const response = await axios.delete(`${API_HOST}/${apiRoute.ADMIN}/${apiRoute.CATEGORY}/${category.id}`, {
                headers: authUtils.getAuthHeader(),
            });

            const accessToken = response.data?.responseHeader?.accessToken;
            if (accessToken) {
                authUtils.updateAccessToken(accessToken);
            }

            return category;
        } catch (error: any) {
            console.error(error.response?.data);
            return undefined;
        }
    },
    async addSubCategory({ category, subCategory }: AddSubCategoryRequest): Promise<SubCategory | undefined> {
        try {
            const request = {
                name: category.name,
                subCategories: [
                    {
                        name: subCategory.name,
                    },
                ],
            };

            const response = await axios.put(
                `${API_HOST}/${apiRoute.ADMIN}/${apiRoute.CATEGORY}/${category.id}`,
                request,
                {
                    headers: authUtils.getAuthHeader(),
                },
            );

            const accessToken = response.data?.responseHeader?.accessToken;
            if (accessToken) {
                authUtils.updateAccessToken(accessToken);
            }

            return subCategory;
        } catch (error: any) {
            console.error(error.response?.data);
            return undefined;
        }
    },
    async updateSubCategory({ category, subCategory }: AddSubCategoryRequest): Promise<SubCategory | undefined> {
        try {
            const request = {
                name: subCategory.name,
            };

            const response = await axios.put(
                `${API_HOST}/${apiRoute.ADMIN}/${apiRoute.CATEGORY}/${category.id}/${apiRoute.SUB_CATEGORY}/${subCategory.id}`,
                request,
                {
                    headers: authUtils.getAuthHeader(),
                },
            );

            const accessToken = response.data?.responseHeader?.accessToken;
            if (accessToken) {
                authUtils.updateAccessToken(accessToken);
            }

            return subCategory;
        } catch (error: any) {
            console.error(error.response?.data);
            return undefined;
        }
    },
};
