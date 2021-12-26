export class ProductDescription {
    id?: number;
    createdAt?: Date;
    content?: string;

    static fromData(data: any): ProductDescription {
        return {
            id: data.id,
            createdAt: new Date(data.createAt),
            content: data.description,
        };
    }
}
