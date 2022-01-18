import { Product, User } from ".";

export class Evaluation {
    id?: number;
    assessor?: User;
    recipient?: User;
    product?: Product;
    comment?: string;
    createAt?: Date;
    isLike?: boolean;
    type?: string;
    status?: string;

    static fromData(data: any): Evaluation {
        const evaluation: Evaluation = {
            id: data?.id,
            assessor: User.fromData(data?.accessor),
            recipient: User.fromData(data?.recipient),
            product: Product.fromData(data?.product),
            comment: data?.comment,
            createAt: new Date(data?.createAt),
            isLike: data?.isLike,
            type: data?.type,
            status: data?.status,
        };
        return evaluation;
    }
}
