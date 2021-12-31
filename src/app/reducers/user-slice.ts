import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { User, UserRole } from "../../models";
import { RootState } from "../store";

interface UserState {
    isLoadingUser: boolean;
    user: User;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: 0,
            name: "",
            avatar: "",
            points: 0,
            email: "",
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
            console.log("End");
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

export const selectUserName = (state: RootState) => state.userState.user.name;
export const selectUserAvatar = (state: RootState) => state.userState.user.avatar;
