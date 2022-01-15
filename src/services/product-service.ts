import axios from "axios";
import { imageService } from ".";
import { pagingConstant } from "../constants";
import { apiRoute, API_HOST } from "../constants/api-routes";
import { Bid, Product } from "../models";
import { authUtils } from "../utils";

export type SortOption = "DATE" | "PRICE";

export interface SearchProductRequest {
    keyword: string;
    categoryId?: number;
    subCategoryId?: number;
    sortBy?: SortOption;
    page?: number;
}

export interface UpdateProductDescriptionRequest {
    product: Product;
    description: string;
}

export interface ProductResponseWithPaging {
    products?: Product[];
    currentPage?: number;
    totalPages?: number;
}

export interface BidProductRequest {
    product?: Product;
    price?: number;
}

export interface ProductBidHistoryRequest {
    product?: Product;
    page?: number;
}

export interface ProductBidHistoryResponseWithPaging {
    bids?: Bid[];
    currentPage?: number;
    totalPages?: number;
}

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
    async uploadProduct(product: Product): Promise<Product | undefined> {
        try {
            const imageUrls = await imageService.uploadImages(product.imageFiles ?? []);

            const uploadRequest: any = {
                name: product.name,
                endAt: product.endDate?.toISOString(),
                currentPrice: product.currentPrice,
                stepPrice: product.stepPrice,
                quickPrice: product.buyPrice,
                autoBid: product.autoExtendTime,
                subCategory: {
                    id: product.subCategory?.id,
                },
                images: imageUrls.map((imageUrl, index) => {
                    return {
                        url: imageUrl,
                        isMain: index === 0,
                    };
                }),
                descriptions: product.description?.map((item) => {
                    return { description: item.content };
                }),
            };

            await axios.post(`${API_HOST}/${apiRoute.SELLER}/${apiRoute.PRODUCT}`, uploadRequest, {
                headers: authUtils.getAuthHeader(),
            });

            return {
                ...product,
                images: imageUrls,
            };
        } catch (err: any) {
            console.warn(err?.response?.data);
            return undefined;
        }
    },
    async updateProductDescription({ product, description }: UpdateProductDescriptionRequest): Promise<boolean> {
        try {
            const request = {
                description,
            };

            const response = await axios.put(
                `${API_HOST}/${apiRoute.SELLER}/${apiRoute.PRODUCT}/${product.id}`,
                request,
                {
                    headers: authUtils.getAuthHeader(),
                },
            );

            if (response.data?.responseHeader?.accessToken?.length > 0) {
                authUtils.updateAccessToken(response.data?.responseHeader?.accessToken);
            }

            return true;
        } catch (error: any) {
            console.error(error.response);
            return false;
        }
    },
    async search({
        keyword = "",
        categoryId = 1,
        subCategoryId,
        sortBy,
        page,
    }: SearchProductRequest): Promise<ProductResponseWithPaging> {
        const requestParams: any = {
            text: keyword,
            categoryId,
            subcategoryId: subCategoryId,
            sortBy,
            page: page ?? 0,
            size: 12,
        };

        const response: any = await axios.get(`${API_HOST}/${apiRoute.PRODUCT}`, {
            params: requestParams,
        });

        const products: Product[] = response?.data?.content.map((item: any) => {
            return Product.fromData(item);
        });
        const totalPages: number = response?.data?.totalPages;

        return { products, totalPages, currentPage: requestParams.page + 1 };
    },
    async deleteProduct(product: Product): Promise<Product | undefined> {
        try {
            const response = await axios.delete(`${API_HOST}/${apiRoute.ADMIN}/${apiRoute.PRODUCT}/${product.id}`, {
                headers: authUtils.getAuthHeader(),
            });

            if (response.data?.responseHeader?.accessToken) {
                authUtils.updateAccessToken(response.data?.responseHeader?.accessToken);
            }

            return product;
        } catch (error: any) {
            console.error(error?.response?.data);
            return undefined;
        }
    },
    async bidProduct({ product, price }: BidProductRequest): Promise<Bid | undefined> {
        try {
            const response = await axios.put(
                `${API_HOST}/${apiRoute.BIDDER}/${apiRoute.PRODUCT}/${product?.id}`,
                {
                    price: price,
                },
                {
                    headers: authUtils.getAuthHeader(),
                },
            );

            if (response.data?.responseHeader?.accessToken) {
                authUtils.updateAccessToken(response.data?.responseHeader?.accessToken);
            }

            const bid = Bid.fromData(response.data?.object);

            return bid;
        } catch (error: any) {
            console.error(error?.response?.data);
            alert(error?.response?.data?.error);
            return undefined;
        }
    },
    async getProductBidHistory({
        product,
        page = 0,
    }: ProductBidHistoryRequest): Promise<ProductBidHistoryResponseWithPaging | undefined> {
        try {
            const response = await axios.get(`${API_HOST}/${apiRoute.PRODUCT}/${product?.id}/history`, {
                params: {
                    page: page,
                    size: pagingConstant.PAGE_SIZE,
                },
            });

            if (response.data?.responseHeader?.accessToken) {
                authUtils.updateAccessToken(response.data?.responseHeader?.accessToken);
            }

            const bids: Bid[] = response?.data?.content?.map((item: any) => Bid.fromData(item));
            return {
                bids: bids,
                currentPage: page + 1,
                totalPages: response.data?.responseBody?.totalPages ?? 1,
            };
        } catch (error: any) {
            console.error(error?.response?.data);
            return undefined;
        }
    },
    async getBiddingProducts(): Promise<Bid[] | undefined> {
        try {
            const response = await axios.get(`${API_HOST}/${apiRoute.BIDDER}/${apiRoute.PRODUCT}`, {
                params: {
                    page: 0,
                    size: 99,
                },
                headers: authUtils.getAuthHeader(),
            });

            if (response.data?.responseHeader?.accessToken) {
                authUtils.updateAccessToken(response.data?.responseHeader?.accessToken);
            }

            const products: Bid[] = response.data?.responseBody?.content?.map((item: any) => Bid.fromData(item));

            return products;
        } catch (error: any) {
            console.error(error?.response?.data);
            return undefined;
        }
    },
    async buyProduct(product: Product): Promise<Product | undefined> {
        try {
            const response = await axios.put(
                `${API_HOST}/${apiRoute.BIDDER}/${apiRoute.PRODUCT}/${product?.id}/${apiRoute.BUY}`,
                {},
                {
                    headers: authUtils.getAuthHeader(),
                },
            );

            if (response.data?.responseHeader?.accessToken) {
                authUtils.updateAccessToken(response.data?.responseHeader?.accessToken);
            }

            return product;
        } catch (error: any) {
            console.error(error?.response?.data);
            alert(error?.response?.data?.error);
            return undefined;
        }
    },
};
