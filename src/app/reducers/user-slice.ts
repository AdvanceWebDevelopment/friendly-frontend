import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pagingConstant } from "../../constants";
import { Bid, Product, User, UserRole } from "../../models";
import { Evaluation } from "../../models/evaluation";
import {
    EvaluationResponseWithPaging,
    ProductResponseWithPaging,
    ReviewRequest,
    UpgradeRequests,
    UpgradeResponseWithPaging,
    UserResponseWithPaging,
} from "../../services";
import { RootState } from "../store";

export interface UserReviewPayload {
    productId: number;
    userId: number;
}

export interface ReviewPayload {
    productInfo: UserReviewPayload;
    reviewInfo: ReviewRequest;
}

interface UserState {
    isLoadingUser: boolean;
    user: User;

    isAddingToWatchedList: boolean;

    isLoadingWatchList: boolean;
    watchedProducts: Product[];
    watchedProductsCurrentPage: number;
    watchedProductsTotalPages: number;

    isLoadingWonProducts: boolean;
    wonProducts: Product[];

    isCancelDeal: boolean;

    isReviewBidder: boolean;

    isReviewSeller: boolean;

    isLoadingSellers: boolean;
    loadedSellers: User[];
    loadedSellersCurrentPage: number;
    loadedSellersTotalPages: number;

    isLoadingListRequestUpgrade: boolean;
    loadedListReqUpgrade: UpgradeRequests[];
    loadedListReqUpgradeCurrentPage: number;
    loadedListReqUpgradeTotalPages: number;

    isUpgrading: boolean;
    isDowngrading: boolean;

    isLoadingUserList: boolean;
    users: User[];
    loadedUserListCurrentPage: number;
    loadedUserListTotalPages: number;

    isCreatingUser: boolean;
    isUpdatingUser: boolean;
    isDeletingUser: boolean;

    isLoadingWinningHistory: boolean;
    loadedWinningHistory: Product[];
    loadedWinningHistoryCurrentPages: number;
    loadedWinningHistoryTotalPages: number;

    isLoadingEvaluations: boolean;
    loadedEvaluations: Evaluation[];
    loadedEvaluationsCurrentPage: number;
    loadedEvaluationsTotalPages: number;

    isLoadingBiddingProducts: boolean;
    biddingProducts: Bid[];
    currentBiddingProductsPage: number;
    totalBiddingProductsPages: number;

    hasNotification: boolean;
    newBids: Bid[];
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

        isLoadingWatchList: false,
        watchedProducts: [],
        watchedProductsCurrentPage: 1,
        watchedProductsTotalPages: 1,

        isLoadingWonProducts: false,
        wonProducts: [],

        isCancelDeal: false,

        isReviewBidder: false,

        isReviewSeller: false,

        isLoadingSellers: false,
        loadedSellers: [],
        loadedSellersCurrentPage: 1,
        loadedSellersTotalPages: 1,

        isLoadingListRequestUpgrade: false,
        loadedListReqUpgrade: [],
        loadedListReqUpgradeCurrentPage: 1,
        loadedListReqUpgradeTotalPages: 1,

        isUpgrading: false,
        isDowngrading: false,

        isLoadingUserList: false,
        loadedUserListCurrentPage: 1,
        loadedUserListTotalPages: 1,
        users: [],

        isCreatingUser: false,
        isUpdatingUser: false,
        isDeletingUser: false,

        isLoadingWinningHistory: false,
        loadedWinningHistory: [],
        loadedWinningHistoryCurrentPages: 1,
        loadedWinningHistoryTotalPages: 1,

        isLoadingEvaluations: false,
        loadedEvaluations: [],
        loadedEvaluationsCurrentPage: 1,
        loadedEvaluationsTotalPages: 1,

        isLoadingBiddingProducts: false,
        biddingProducts: [],
        currentBiddingProductsPage: 1,
        totalBiddingProductsPages: 1,

        hasNotification: false,
        newBids: [],
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
        requestWonList: (state: UserState) => {
            state.isLoadingWonProducts = true;
        },

        completeGetWonList: (state: UserState, action: PayloadAction<Product[]>) => {
            state.wonProducts = action.payload;
            state.isLoadingWonProducts = false;
        },

        cancelDeal: (state: UserState, action: PayloadAction<UserReviewPayload>) => {
            state.isCancelDeal = true;
        },
        completeCancelDeal: (state: UserState) => {
            state.isCancelDeal = false;
        },

        sendReviewToBidder: (state: UserState, action: PayloadAction<ReviewPayload>) => {
            state.isReviewBidder = true;
        },

        completeSendReviewToBidder: (state: UserState) => {
            state.isReviewBidder = false;
        },

        sendReviewToSeller: (state: UserState, action: PayloadAction<ReviewPayload>) => {
            state.isReviewBidder = true;
        },

        completeSendReviewToSeller: (state: UserState) => {
            state.isReviewBidder = false;
        },

        requestListSeller: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingSellers = true;
            state.loadedSellersCurrentPage = 1;
            state.loadedSellersTotalPages = 1;
        },
        completeGetListSeller: (state: UserState, action: PayloadAction<UserResponseWithPaging>) => {
            state.isLoadingSellers = false;
            state.loadedSellers = action.payload.users ?? [];
            state.loadedSellersCurrentPage = action.payload.currentPage ?? 1;
            state.loadedSellersTotalPages = action.payload.totalPages ?? 1;
        },

        requestListUpgrade: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingListRequestUpgrade = true;
            state.loadedListReqUpgradeCurrentPage = 1;
            state.loadedListReqUpgradeTotalPages = 1;
        },
        completeGetListUpgrade: (state: UserState, action: PayloadAction<UpgradeResponseWithPaging>) => {
            state.isLoadingListRequestUpgrade = false;
            state.loadedListReqUpgrade = action.payload.request ?? [];
            state.loadedListReqUpgradeCurrentPage = action.payload.currentPage ?? 1;
            state.loadedListReqUpgradeTotalPages = action.payload.totalPages ?? 1;
        },

        upgrade: (state: UserState, action: PayloadAction<string>) => {
            state.isUpgrading = true;
        },
        completeUpgrade: (state: UserState) => {
            state.isUpgrading = false;
        },

        downgrade: (state: UserState, action: PayloadAction<string>) => {
            state.isDowngrading = true;
            state.user.role = UserRole.SELLER;
        },
        completeDowngrade: (state: UserState) => {
            state.isDowngrading = false;
            state.user.role = UserRole.BIDDER;
        },
        requestGetUserList: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingUserList = true;
        },
        completeGetUserList: (state: UserState, action: PayloadAction<UserResponseWithPaging>) => {
            state.isLoadingUserList = false;
            state.loadedUserListCurrentPage = action.payload.currentPage ?? 1;
            state.loadedUserListTotalPages = action.payload.totalPages ?? 1;
            state.users = action.payload.users ?? [];
        },
        requestCreateUser: (state: UserState, action: PayloadAction<User>) => {
            state.isCreatingUser = true;
        },
        completeCreateUser: (state: UserState, action: PayloadAction<User>) => {
            state.isCreatingUser = false;
        },
        requestAdminUpdateUser: (state: UserState, action: PayloadAction<User>) => {
            state.isUpdatingUser = true;
        },
        completeAdminUpdateUser: (state: UserState, action: PayloadAction<User>) => {
            state.isUpdatingUser = false;
        },
        requestDeleteUser: (state: UserState, action: PayloadAction<User>) => {
            state.isDeletingUser = true;
        },
        completeDeleteUser: (state: UserState, action: PayloadAction<User>) => {
            state.isDeletingUser = false;
            state.users = state.users.filter((user) => user.id !== action.payload.id);
        },
        requestWinningHistory: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingWinningHistory = true;
            state.loadedWinningHistoryCurrentPages = 1;
            state.loadedWinningHistoryTotalPages = 1;
        },
        completeGetWinningHistory: (state: UserState, action: PayloadAction<ProductResponseWithPaging>) => {
            state.isLoadingWinningHistory = false;
            state.loadedWinningHistory = action.payload.products ?? [];
            state.loadedWinningHistoryCurrentPages = action.payload.currentPage ?? 1;
            state.loadedWinningHistoryTotalPages = action.payload.totalPages ?? 1;
        },

        requestEvaluations: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingEvaluations = true;
        },
        completeGetEvaluations: (state: UserState, action: PayloadAction<EvaluationResponseWithPaging>) => {
            state.isLoadingEvaluations = false;
            state.loadedEvaluations = action.payload.evaluations ?? [];
            state.loadedEvaluationsCurrentPage = action.payload.currentPage ?? 1;
            state.loadedEvaluationsTotalPages = action.payload.totalPages ?? 1;
        },
        requestGetBiddingProducts: (state) => {
            state.isLoadingBiddingProducts = true;
        },
        completeGetBiddingProducts: (state, action: PayloadAction<Bid[]>) => {
            state.isLoadingBiddingProducts = false;
            state.biddingProducts = action.payload;

            state.totalBiddingProductsPages = Math.ceil(state.biddingProducts.length / pagingConstant.PAGE_SIZE);
        },
        setCurrentBiddingProductsPage: (state, action: PayloadAction<number>) => {
            state.currentBiddingProductsPage = action.payload;
        },
        setHasNotification: (state: UserState, action: PayloadAction<boolean>) => {
            state.hasNotification = action.payload;
        },
        pushNotifications: (state: UserState, action: PayloadAction<Bid>) => {
            const bid = action.payload;
            state.biddingProducts.some((item) => {
                if (item.product?.id === bid.product?.id) {
                    state.newBids.unshift(bid);
                    state.hasNotification = true;
                    return true;
                }
            });
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

    requestWonList,
    completeGetWonList,

    cancelDeal,
    completeCancelDeal,

    sendReviewToBidder,
    completeSendReviewToBidder,

    sendReviewToSeller,
    completeSendReviewToSeller,

    requestListSeller,
    completeGetListSeller,

    requestListUpgrade,
    completeGetListUpgrade,

    upgrade,
    completeUpgrade,

    downgrade,
    completeDowngrade,

    requestGetUserList,
    completeGetUserList,

    requestCreateUser,
    completeCreateUser,

    requestAdminUpdateUser,
    completeAdminUpdateUser,

    requestDeleteUser,
    completeDeleteUser,

    requestWinningHistory,
    completeGetWinningHistory,

    requestEvaluations,
    completeGetEvaluations,
} = userSlice.actions;

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectUserName = (state: RootState) => state.userState.user.name;
export const selectUserAvatar = (state: RootState) => state.userState.user.avatar;
