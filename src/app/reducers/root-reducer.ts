import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from "./category-slice";
import { productReducer } from "./product-slice";
import { userReducer } from "./user-slice";
import { authReducers } from "./auth-slice";
import { forgotPasswordReducers } from "./forgot-pwd-slice";
import { flowStepsReducer } from "./account-flow-steps-slice";
export const rootReducer = combineReducers({
    categoryState: categoryReducer,
    productState: productReducer,
    userState: userReducer,
    authState: authReducers,
    forgotPasswordState: forgotPasswordReducers,
    flowStepsState: flowStepsReducer,
});
