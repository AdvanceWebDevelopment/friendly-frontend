import { SubCategory } from ".";
import { Bid } from "./bid";
import { Category } from "./category";
import { ProductDescription } from "./product-description";
import { User } from "./user";

export class Product {
    id?: number;
    name?: string;
    description?: ProductDescription[];
    category?: Category;
    images?: string[];
    postDate?: Date;
    endDate?: Date;
    currentPrice?: number;
    stepPrice?: number;
    buyPrice?: number;
    seller?: User;
    highestBidder?: User;
    biddingList?: Bid[];
    currentBids?: number;

    static fromData(data: any): Product {
        const product: Product = {
            id: data.id,
            name: data.name,
            category: Category.fromData(data.subCategory.category),
            images: data?.images.map((image: any) => image.url),
            description: data.descriptions?.map((item: any) => {
                return ProductDescription.fromData(item);
            }),
            currentPrice: data.currentPrice,
            stepPrice: data.stepPrice,
            buyPrice: data.quickPrice,
            seller: User.fromData(data.seller),
            currentBids: data.currentBids,
            postDate: new Date(data.createAt),
            endDate: new Date(data.endAt),
        };

        product.category!.subCategory = SubCategory.fromData(data.subCategory);

        return product;
    }
}
