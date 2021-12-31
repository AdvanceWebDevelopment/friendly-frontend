import { all } from "redux-saga/effects";
import { authSaga } from "./auth-saga";
import { watchRequestProductByCategory } from "./category-saga";
import { forgotPasswordSaga } from "./forgot-pwd-saga";
import { productSaga } from "./product-saga";
import { registerSaga } from "./register-saga";
import { userSaga } from "./user-saga";

export default function* rootSaga() {
    console.log(`Start root saga`);
    yield all([
        productSaga(),

        watchRequestProductByCategory(),

        userSaga(),

        authSaga(),
        forgotPasswordSaga(),
        registerSaga(),
    ]);
}
