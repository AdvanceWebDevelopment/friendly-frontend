export class SubCategory {
    id?: number;
    name?: string;

    static fromData(data: any): SubCategory {
        return {
            id: data.id,
            name: data.name,
        };
    }
}
