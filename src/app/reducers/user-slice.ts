import { createSlice } from "@reduxjs/toolkit";
import { User, UserRole } from "../../models";

interface UserState {
    isLoadingUser: boolean;
    user: User;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: 1,
            name: "Andy Wood",
            avatar: "https://picsum.photos/id/1005/200",
            role: UserRole.ADMIN,
            points: 10,
            email: "andy@gmail.com",
            nation: "Việt Nam",
            city: "Hồ Chí Minh",
            district: "Quận 5",
            street: "Nguyễn Văn Cừ",
        },
        isLoadingUser: false,
    } as UserState,
    reducers: {},
});

export const {} = userSlice.actions;

export const userReducer = userSlice.reducer;
