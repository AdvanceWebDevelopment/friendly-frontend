import { Product } from ".";
import { User } from "./user";

export class Bid {
    id?: number;
    bidAt?: Date;
    bidder?: User;
    bidPrice?: number;
    product?: Product;
    reject?: boolean;
    status?: boolean;

    static fromData(data: any): Bid {
        return {
            id: data.id,
            bidder: User.fromData(data.bidder),
            product: Product.fromData(data.product),
            bidAt: new Date(data.bidAt),
            reject: data.reject,
            status: data.status,
        };
    }
}
