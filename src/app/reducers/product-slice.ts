import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bid, Product } from "../../models";
import { BidProductRequest, UpdateProductDescriptionRequest } from "../../services";

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

    isUploadingProduct: boolean;
    isUploadSuccessful: boolean;
    uploadedProduct: Product;

    isSearchingProduct: boolean;
    searchedProducts: Product[];
    currentPage: number;
    totalPages: number;

    isEditProduct: boolean;
    isUpdatingProductDescription: boolean;

    isDeletingProduct?: boolean;
    deletedProduct?: Product;

    isBiddingProduct: boolean;
}

const updateProductBidStatus = (product: Product, updatedProduct?: Product) => {
    product.highestBidder = updatedProduct?.highestBidder;
    product.currentPrice = updatedProduct?.currentPrice;
    product.currentBids = updatedProduct?.currentBids;
};

export function updateBidderInProducts(products: Product[], bid: Bid) {
    const updatedProduct = bid.product;

    products.forEach((product) => {
        if (product.id === updatedProduct?.id) {
            updateProductBidStatus(product, updatedProduct ?? {});
        }
    });
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

        isUploadingProduct: false,
        isUploadSuccessful: false,
        uploadedProduct: {},

        isSearchingProduct: false,
        searchedProducts: [],
        currentPage: 1,
        totalPages: 1,

        isEditProduct: false,
        isUpdatingProductDescription: false,

        isDeletingProduct: undefined,
        deletedProduct: undefined,

        isBiddingProduct: false,
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
        requestUploadProduct: (state, action: PayloadAction<Product>) => {
            state.isUploadingProduct = true;
            state.isUploadSuccessful = false;
            state.uploadedProduct = action.payload;
        },
        failUploadProduct: (state, action: PayloadAction<string>) => {
            state.isUploadingProduct = false;
            state.isUploadSuccessful = false;
        },
        completeUploadProduct: (state, action: PayloadAction<Product>) => {
            state.isUploadingProduct = false;
            state.isUploadSuccessful = true;
            state.uploadedProduct = action.payload;
        },
        setEditProduct: (state, action: PayloadAction<boolean>) => {
            state.isEditProduct = action.payload;
        },
        requestUpdateProductDescription: (state, action: PayloadAction<UpdateProductDescriptionRequest>) => {
            state.isUpdatingProductDescription = true;
        },
        completeUpdateProductDescription: (state, action: PayloadAction<Product>) => {
            state.isUpdatingProductDescription = false;
            state.productDetail = action.payload;
        },
        requestDeleteProduct: (state, action: PayloadAction<Product>) => {
            state.isDeletingProduct = true;
        },
        completeDeleteProduct: (state, action: PayloadAction<Product>) => {
            state.isDeletingProduct = false;
            state.deletedProduct = action.payload;
        },
        setIsDeletingProduct: (state, action: PayloadAction<boolean | undefined>) => {
            state.isDeletingProduct = action.payload;
        },
        requestBidProduct: (state, action: PayloadAction<BidProductRequest>) => {
            state.isBiddingProduct = true;
        },
        completeBidProduct: (state, action: PayloadAction<Bid>) => {
            state.isBiddingProduct = false;

            updateBidderInProducts(state.hottestProducts, action.payload);
            updateBidderInProducts(state.endSoonProducts, action.payload);
            updateBidderInProducts(state.mostBiddedProducts, action.payload);
            updateBidderInProducts(state.relatedProducts, action.payload);

            if (state.productDetail.id === action.payload.product?.id) {
                updateProductBidStatus(state.productDetail, action.payload.product);
            }
        },
        updateHighestBidder: (state, action: PayloadAction<Bid>) => {
            updateBidderInProducts(state.hottestProducts, action.payload);
            updateBidderInProducts(state.endSoonProducts, action.payload);
            updateBidderInProducts(state.mostBiddedProducts, action.payload);
            updateBidderInProducts(state.relatedProducts, action.payload);

            if (state.productDetail.id === action.payload.product?.id) {
                updateProductBidStatus(state.productDetail, action.payload.product);
            }
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

    requestUploadProduct,
    completeUploadProduct,
    failUploadProduct,

    setEditProduct,
    requestUpdateProductDescription,
    completeUpdateProductDescription,

    requestDeleteProduct,
    completeDeleteProduct,
    setIsDeletingProduct,

    requestBidProduct,
    completeBidProduct,
    updateHighestBidder,
} = productSlice.actions;

export const productActions = productSlice.actions;

export const productReducer = productSlice.reducer;
