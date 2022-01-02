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

    isAddingCategory: boolean;
    isDeletingCategory: boolean;
    isUpdatingCategory: boolean;
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
} = categorySlice.actions;

export const selectCategories = (state: RootState) => state.categoryState.categories;

export const categoryReducer = categorySlice.reducer;
