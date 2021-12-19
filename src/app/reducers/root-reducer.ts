import { combineReducers } from "@reduxjs/toolkit";
import { categorySlice } from "./category-slice";

export const rootReducer = combineReducers({
    categoryState: categorySlice.reducer,
});
