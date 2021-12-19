import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../models/category";
import { categoryService } from "../../services/category-service";

interface CategoryState {
    categories: Category[];
    selectedId?: number;
}

const categorySlice = createSlice({
    name: "category",
    initialState: {
        selectedId: undefined,
        categories: [],
    } as CategoryState,
    reducers: {
        setSelectedId: (state, action: PayloadAction<number | undefined>) => {
            state.selectedId = action.payload;
        },
        getCategories: (state) => {
            state.categories = categoryService.getCategories();
        },
    },
});

export const { setSelectedId, getCategories } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
