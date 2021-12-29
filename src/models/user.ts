export enum UserRole {
    BIDDER = 0,
    SELLER = 1,
    ADMIN = 2,
}

export class User {
    id?: number;
    email?: string;
    name?: string;
    avatar?: string;
    nation?: string;
    city?: string;
    district?: string;
    street?: string;
    points?: number;
    role?: UserRole;

    static fromData(data: any): User {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            avatar: data.imageUrl,
            role: data.role,
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

    static locationOf(user: User): string {
        let location = user.street ? user.street + ", " : "";
        location += user.district ? user.district + ", " : "";
        location += user.city ? user.city + ", " : "";
        location += user.nation;

        return location;
    }
}
