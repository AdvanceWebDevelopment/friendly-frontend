import { all } from "redux-saga/effects";
import { authSaga } from "./auth-saga";
import { categorySaga } from "./category-saga";
import { changePasswordSaga } from "./change-password-saga";
import { forgotPasswordSaga } from "./forgot-pwd-saga";
import { productSaga } from "./product-saga";
import { registerSaga } from "./register-saga";
import { userSaga } from "./user-saga";

export default function* rootSaga() {
    yield all([
        productSaga(),
        categorySaga(),
        userSaga(),
        authSaga(),
        forgotPasswordSaga(),
        registerSaga(),
        changePasswordSaga(),
    ]);
}
