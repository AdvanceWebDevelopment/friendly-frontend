export class ProductDescription {
    id?: number;
    createdAt?: Date;
    content?: string;

    static fromData(data: any): ProductDescription {
        return {
            id: data.id,
            createdAt: data.createAt,
            content: data.description,
        };
    }
}
