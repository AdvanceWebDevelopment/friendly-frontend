import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models";
import { Category } from "../../models/category";
import { categoryService } from "../../services/category-service";

interface CategoryState {
    categories: Category[];
    selectedId?: number;
    isLoading: boolean;
    categoryProducts: Product[];
    currentPage: number;
    totalPages: number;
}

const categorySlice = createSlice({
    name: "category",
    initialState: {
        selectedId: undefined,
        categories: [],
        categoryProducts: [],
        isLoading: true,
        currentPage: 1,
        totalPages: 1,
    } as CategoryState,
    reducers: {
        setSelectedId: (state, action: PayloadAction<number | undefined>) => {
            state.selectedId = action.payload;
        },
        getCategories: (state) => {
            state.categories = categoryService.getCategories();
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
            state.totalPages = action.payload.totalPages;
        },
    },
});

export const { setSelectedId, getCategories, requestProductsByCategoryId, completeGetProductsByCategoryId } =
    categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
