import { Product } from ".";

export enum UserRole {
    ADMIN = 0,
    BIDDER = 1,
    SELLER = 2,
}

export class User {
    id?: number;
    email?: string;
    name?: string;
    password?: string;
    dob?: Date;
    avatar?: string;
    points?: number;
    role?: UserRole;
    sellingProducts?: Product[];

    static fromData(data: any): User {
        return {
            id: data?.id,
            name: data?.name,
            email: data?.email,
            avatar: data?.imageUrl,
            role: data?.role,
            dob: new Date(data?.birthDay),
            points: data?.point,
        };
    }

    static roleNameOf(role?: UserRole): string {
        switch (role) {
            case UserRole.ADMIN:
                return "Quản Trị Viên";
            case UserRole.SELLER:
                return "Người Bán";
            default:
                return "Người Bán";
        }
    }
}
