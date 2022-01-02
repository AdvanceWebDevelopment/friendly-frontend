import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, User, UserRole } from "../../models";
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

    isUpgrading: boolean;
    isDowngrading: boolean;
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
        isUpgrading: false,
        isDowngrading: false,
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

        upgrade(state: UserState, action: PayloadAction<string>) {
            state.isUpgrading = true;
        },
        completeUpgrade(state: UserState) {
            state.isUpgrading = false;
        },

        downgrade(state: UserState, action: PayloadAction<string>) {
            state.isDowngrading = true;
            state.user.role = UserRole.SELLER;
        },
        completeDowngrade(state: UserState) {
            state.isDowngrading = false;
            state.user.role = UserRole.BIDDER;
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

    upgrade,
    completeUpgrade,

    downgrade,
    completeDowngrade,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectUserName = (state: RootState) => state.userState.user.name;
export const selectUserAvatar = (state: RootState) => state.userState.user.avatar;
