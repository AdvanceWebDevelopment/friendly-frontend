import axios from "axios";
import { imageService } from ".";
import { apiRoute, API_HOST } from "../constants/api-routes";
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
    async uploadProduct(product: Product): Promise<Product | string> {
        console.log(`uploadProduct`);
        try {
            const imageUrls = await imageService.uploadImages(product.imageFiles ?? []);

            const uploadRequest: any = {
                name: product.name,
                endAt: product.endDate,
                currentPrice: product.currentPrice,
                stepPrice: product.stepPrice,
                quickPrice: product.buyPrice,
                autoBid: product.buyPrice !== undefined,
                subCategory: {
                    id: product.subCategory?.id,
                },
                images: imageUrls.map((imageUrl, index) => {
                    return {
                        url: imageUrl,
                        isMain: index === 0,
                    };
                }),
                description: product.description,
            };

            await axios.post(`${API_HOST}/${apiRoute.SELLER}/${apiRoute.PRODUCT}`, uploadRequest);
            return {
                ...product,
                images: imageUrls,
            };
        } catch (err: any) {
            return err?.response?.data?.error;
        }
    },
};
