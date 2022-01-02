import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, User } from "../../models";
import { ProductResponseWithPaging } from "../../services";
import { RootState } from "../store";

interface UserState {
    isLoadingUser: boolean;
    user: User;

    isAddingToWatchedList: boolean;
    isLoadingWatchList: boolean;
    watchedProducts: Product[];
    watchedProductsCurrentPage: number;
    watchedProductsTotalPages: number;
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
        isAddingToWatchedList: false,
        watchedProducts: [],
        isLoadingWatchList: false,
        watchedProductsTotalPages: 1,
        watchedProductsCurrentPage: 1,
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
        requestAddToWatchList: (state: UserState, action: PayloadAction<Product>) => {
            state.isAddingToWatchedList = true;
        },
        completeAddToWatchList: (state: UserState, action: PayloadAction<Product>) => {
            state.isAddingToWatchedList = false;
            state.watchedProducts.push(action.payload);
        },
        requestWatchList: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingWatchList = true;
            state.watchedProductsCurrentPage = 1;
            state.watchedProductsTotalPages = 1;
        },
        completeGetWatchList: (state: UserState, action: PayloadAction<ProductResponseWithPaging>) => {
            state.isLoadingWatchList = false;
            state.watchedProducts = action.payload.products ?? [];
            state.watchedProductsCurrentPage = action.payload.currentPage ?? 1;
            state.watchedProductsTotalPages = action.payload.totalPages ?? 1;
        },
    },
});

export const {
    requestUser,
    completeGetUser,

    requestUpdateUser,
    completeUpdateUser,

    requestAddToWatchList,
    completeAddToWatchList,

    requestWatchList,
    completeGetWatchList,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectUserName = (state: RootState) => state.userState.user.name;
export const selectUserAvatar = (state: RootState) => state.userState.user.avatar;
