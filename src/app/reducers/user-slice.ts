import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
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
            dob: new Date(2000, 11, 1),
        },
        isLoadingUser: false,
    } as UserState,
    reducers: {
        requestUser: (state: UserState) => {
            state.isLoadingUser = true;
        },
        completeGetUser: (state: UserState, action: PayloadAction<User>) => {
            state.isLoadingUser = false;
            state.user = action.payload;
        },
        requestUpdateUser: (state: UserState, action: PayloadAction<User>) => {
            state.isLoadingUser = true;
            state.user = action.payload;
        },
        completeUpdateUser: (state: UserState, action: PayloadAction<User>) => {
            state.isLoadingUser = false;

            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
            state.user.dob = action.payload.dob;
        },
    },
});

export const { requestUser, completeGetUser, requestUpdateUser, completeUpdateUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
