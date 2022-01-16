import { Product, User } from ".";

export class BidRequest {
    id?: number;
    bidder?: User;
    product?: Product;

    static fromData(data: any): BidRequest {
        return {
            id: data.id,
            bidder: User.fromData(data.bidder),
            product: Product.fromData(data.product),
        };
    }
}
