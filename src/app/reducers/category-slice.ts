import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../models/category";
import { categoryService } from "../../services/category-service";

interface CategoryState {
    categories: Category[];
    selectedId?: number;
}

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
    } as CategoryState,
    reducers: {
        setSelectedId: (state, action: PayloadAction<number | undefined>) => {
            state.selectedId = action.payload;
        },
        getCategories: (state, action: PayloadAction) => {
            console.log(`Call categorySlice.getCategories`);
            state.categories = categoryService.getCategories();
        },
    },
});

export const { setSelectedId, getCategories } = categorySlice.actions;
