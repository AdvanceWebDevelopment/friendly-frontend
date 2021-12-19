import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from "./category-slice";
import { productReducer } from "./product-slice";

export const rootReducer = combineReducers({
    categoryState: categoryReducer,
    productState: productReducer,
});
