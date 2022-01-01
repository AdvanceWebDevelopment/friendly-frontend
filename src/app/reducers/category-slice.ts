import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models";
import { Category } from "../../models/category";
import { ProductResponseWithPaging, SearchProductRequest } from "../../services";
import { categoryService } from "../../services/category-service";
import { RootState } from "../store";

interface CategoryState {
    isLoadingCategories: boolean;
    categories: Category[];
    selectedCategoryId?: number;
    selectedSubCategoryId?: number;
    isLoading: boolean;
    categoryProducts: Product[];
    currentPage: number;
    totalPages: number;
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
        },
        completeSearchProduct: (state, action: PayloadAction<ProductResponseWithPaging>) => {
            state.isLoading = false;
            state.categoryProducts = action.payload.products;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages === 0 ? 1 : action.payload.totalPages;
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
} = categorySlice.actions;

export const selectCategories = (state: RootState) => state.categoryState.categories;

export const categoryReducer = categorySlice.reducer;
