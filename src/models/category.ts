import { SubCategory } from "./sub-category";

export class Category {
    id?: number;
    name?: string;
    subCategories?: SubCategory[];

    static getIconByName(name: string) {
        switch (name.trim()) {
            case "Tất Cả":
                return "bx:bx-category";
            case "Điện Tử":
                return "bx:bx-camera";
            case "Phụ Kiện":
                return "ic:outline-watch";
            case "Nội Thất":
                return "mdi:sofa-single-outline";
            case "Trang Sức":
                return "icon-park-outline:diamond-necklace";
            case "Tranh Vẽ":
                return "ion:color-palette-outline";
            case "Phương Tiện":
                return "bx:bx-car";
            default:
                return "";
        }
    }

    static fromData(data: any): Category {
        return {
            id: data.id,
            name: data.name,
        };
    }
}
