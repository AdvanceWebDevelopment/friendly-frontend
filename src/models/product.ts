import { Bid } from "./bid";
import { Category } from "./category";
import { ProductDescription } from "./product-description";
import { User } from "./user";

export class Product {
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
}
