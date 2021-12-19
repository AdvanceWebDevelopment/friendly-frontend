import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models";

interface ProductState {
    isLoading: boolean;
    newestProducts: Product[];
}

const productSlice = createSlice({
    name: "product",
    initialState: { newestProducts: [], isLoading: true } as ProductState,
    reducers: {
        requestTopFiveNewest: (state) => {
            console.log(`Call productSlice.requestTopFiveNewest`);
            state.isLoading = true;
        },
        completeGetTopFiveNewest: (state, action: PayloadAction<Product[]>) => {
            state.isLoading = false;
            state.newestProducts = action.payload;
        },
    },
});

export const { requestTopFiveNewest, completeGetTopFiveNewest } = productSlice.actions;

export const productReducer = productSlice.reducer;
