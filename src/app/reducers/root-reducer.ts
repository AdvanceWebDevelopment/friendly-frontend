import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from "./category-slice";
import { productReducer } from "./product-slice";
import { userReducer } from "./user-slice";

export const rootReducer = combineReducers({
    categoryState: categoryReducer,
    productState: productReducer,
    userState: userReducer,
});
