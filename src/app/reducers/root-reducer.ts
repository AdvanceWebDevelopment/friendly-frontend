import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from "./category-slice";
import { productReducer } from "./product-slice";
import { userReducer } from "./user-slice";
import { authReducers } from "./auth-slice";
import { forgotPasswordReducer } from "./forgot-pwd-slice";
import { flowStepsReducer } from "./account-flow-steps-slice";
import { registerReducer } from "./register-slice";
export const rootReducer = combineReducers({
    categoryState: categoryReducer,
    productState: productReducer,
    userState: userReducer,
    authState: authReducers,
    forgotPasswordState: forgotPasswordReducer,
    flowStepsState: flowStepsReducer,
    registerState: registerReducer,
});
