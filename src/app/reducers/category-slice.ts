import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bid, Category, Product, SubCategory } from "../../models";
import { AddSubCategoryRequest, ProductResponseWithPaging, SearchProductRequest } from "../../services";
import { RootState } from "../store";
import { updateBidderInProducts } from "./product-slice";

interface CategoryState {
    isLoadingCategories: boolean;
    categories: Category[];
    selectedCategoryId?: number;
    selectedSubCategoryId?: number;
    isLoading: boolean;
    categoryProducts: Product[];
    currentPage: number;
    totalPages: number;

    isAddingCategory: boolean;
    isDeletingCategory: boolean;
    isUpdatingCategory: boolean;

    isAddingSubCategory: boolean;
    isUpdatingSubCategory: boolean;
    isDeletingSubCategory: boolean;
}

const categorySlice = createSlice({
    name: "category",
    initialState: {
        isLoadingCategories: true,
        categories: [],

        selectedCategoryId: 1,
        categoryProducts: [],
        isLoading: true,
        currentPage: 1,
        totalPages: 1,

        isAddingCategory: false,
        isDeletingCategory: false,
        isUpdatingCategory: false,

        isAddingSubCategory: false,
        isUpdatingSubCategory: false,
        isDeletingSubCategory: false,
    } as CategoryState,
    reducers: {
        setSelectedCategoryId: (state, action: PayloadAction<number | undefined>) => {
            state.selectedCategoryId = action.payload;
        },
        requestGetCategories: (state) => {
            state.isLoadingCategories = true;
        },
        completeGetCategories: (state, action: PayloadAction<Category[]>) => {
            state.isLoadingCategories = false;
            state.categories = action.payload;
        },
        requestProductsByCategoryId: (state, action: PayloadAction<{ categoryId: number; currentPage: number }>) => {
            state.isLoading = true;
            state.currentPage = action.payload.currentPage;
        },
        completeGetProductsByCategoryId: (
            state,
            action: PayloadAction<{ products: Product[]; totalPages: number }>,
        ) => {
            state.isLoading = false;
            state.categoryProducts = action.payload.products;
            state.totalPages = action.payload.totalPages === 0 ? 1 : action.payload.totalPages;
        },
        requestSearchProduct: (state, action: PayloadAction<SearchProductRequest>) => {
            state.isLoading = true;
            state.currentPage = action.payload.page ? action.payload.page + 1 : 1;
        },
        completeSearchProduct: (state, action: PayloadAction<ProductResponseWithPaging>) => {
            state.isLoading = false;
            state.categoryProducts = action.payload.products ?? [];
            state.currentPage = action.payload.currentPage ?? 1;
            state.totalPages = action.payload.totalPages === 0 ? 1 : action.payload.totalPages!;
        },
        requestAddCategory: (state, action: PayloadAction<Category>) => {
            state.isAddingCategory = true;
        },
        completeAddCategory: (state, action: PayloadAction<Category>) => {
            state.isAddingCategory = false;
            state.categories = [...state.categories, action.payload];
        },
        requestDeleteCategory: (state, action: PayloadAction<Category>) => {
            state.isDeletingCategory = true;
        },
        completeDeleteCategory: (state, action: PayloadAction<Category>) => {
            state.isDeletingCategory = false;
            state.categories = state.categories.filter((category) => category.id !== action.payload.id);
        },
        requestUpdateCategory: (state, action: PayloadAction<Category>) => {
            state.isUpdatingCategory = true;
        },
        completeUpdateCategory: (state, action: PayloadAction<Category>) => {
            state.isUpdatingCategory = false;

            state.categories.forEach((category) => {
                if (category.id === action.payload.id) {
                    category.name = action.payload.name;
                }
            });
        },
        requestAddSubCategory: (state, action: PayloadAction<AddSubCategoryRequest>) => {
            state.isAddingSubCategory = true;
        },
        completeAddSubCategory: (state, action: PayloadAction<SubCategory>) => {
            state.isAddingSubCategory = false;
        },
        requestUpdateSubCategory: (state, action: PayloadAction<AddSubCategoryRequest>) => {
            state.isUpdatingSubCategory = true;
        },
        completeUpdateSubCategory: (state, action: PayloadAction<SubCategory>) => {
            state.isUpdatingSubCategory = false;
        },
        requestDeleteSubCategory: (state, action: PayloadAction<SubCategory>) => {
            state.isDeletingSubCategory = true;
        },
        completeDeleteSubCategory: (state, action: PayloadAction<SubCategory>) => {
            state.isDeletingSubCategory = false;

            state.categories.forEach((category) => {
                category.subCategories = category.subCategories?.filter(
                    (subCategory) => subCategory.id !== action.payload.id,
                );
            });
        },
        updateProductHighestBidder: (state, action: PayloadAction<Bid>) => {
            updateBidderInProducts(state.categoryProducts, action.payload);
        },
    },
});

export const {
    setSelectedCategoryId,

    requestGetCategories,
    completeGetCategories,

    requestProductsByCategoryId,
    completeGetProductsByCategoryId,

    requestSearchProduct,
    completeSearchProduct,

    requestAddCategory,
    completeAddCategory,

    requestDeleteCategory,
    completeDeleteCategory,

    requestUpdateCategory,
    completeUpdateCategory,

    requestAddSubCategory,
    completeAddSubCategory,

    requestUpdateSubCategory,
    completeUpdateSubCategory,

    requestDeleteSubCategory,
    completeDeleteSubCategory,

    updateProductHighestBidder,
} = categorySlice.actions;

export const selectCategories = (state: RootState) => state.categoryState.categories;

export const categoryReducer = categorySlice.reducer;
