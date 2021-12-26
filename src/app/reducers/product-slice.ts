import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models";

interface ProductState {
    isLoadingMostBidded: boolean;
    mostBiddedProducts: Product[];

    isLoadingHottest: boolean;
    hottestProducts: Product[];

    isLoadingEndSoon: boolean;
    endSoonProducts: Product[];

    isLoadingProductDetail: boolean;
    productDetail: Product;
    relatedProducts: Product[];
}

const productSlice = createSlice({
    name: "product",
    initialState: {
        isLoadingMostBidded: true,
        mostBiddedProducts: [],

        isLoadingHottest: true,
        hottestProducts: [],

        isLoadingEndSoon: true,
        endSoonProducts: [],

        isLoadingProductDetail: true,
        productDetail: {},
        relatedProducts: [],
    } as ProductState,
    reducers: {
        requestTopFiveMostBidded: (state) => {
            state.isLoadingMostBidded = true;
        },
        completeGetTopFiveMostBidded: (state, action: PayloadAction<Product[]>) => {
            state.isLoadingMostBidded = false;
            state.mostBiddedProducts = action.payload;
        },
        requestTopFiveHottest: (state) => {
            state.isLoadingHottest = true;
        },
        completeGetTopFiveHottest: (state, action: PayloadAction<Product[]>) => {
            state.isLoadingHottest = false;
            state.hottestProducts = action.payload;
        },
        requestTopFiveEndSoon: (state) => {
            state.isLoadingEndSoon = true;
        },
        completeGetTopFiveEndSoon: (state, action: PayloadAction<Product[]>) => {
            state.isLoadingEndSoon = false;
            state.endSoonProducts = action.payload;
        },
        requestProductDetail: (state, action: PayloadAction<string>) => {
            state.isLoadingProductDetail = true;
        },
        completeGetProductDetail: (
            state,
            action: PayloadAction<{ productDetail: Product; relatedProducts: Product[] }>,
        ) => {
            state.isLoadingProductDetail = false;
            state.productDetail = action.payload.productDetail;
            state.relatedProducts = action.payload.relatedProducts;
        },
    },
});

export const {
    requestTopFiveMostBidded,
    completeGetTopFiveMostBidded,
    requestTopFiveHottest,
    completeGetTopFiveHottest,
    requestTopFiveEndSoon,
    completeGetTopFiveEndSoon,
    requestProductDetail,
    completeGetProductDetail,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
