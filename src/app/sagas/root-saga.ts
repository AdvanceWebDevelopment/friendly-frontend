import { all } from "redux-saga/effects";
import { authSaga } from "./auth-saga";
import { watchRequestProductByCategory } from "./category-saga";
import { forgotPasswordSaga } from "./forgot-pwd-saga";
import { watchReqestTopFiveProducts, watchRequestProductDetail, watchRequestUploadProduct } from "./product-saga";
import { registerSaga } from "./register-saga";
import { userSaga } from "./user-saga";

export default function* rootSaga() {
    console.log(`Start root saga`);
    yield all([
        watchReqestTopFiveProducts(),
        watchRequestProductByCategory(),
        watchRequestProductDetail(),
        watchRequestUploadProduct(),

        userSaga(),

        authSaga(),
        forgotPasswordSaga(),
        registerSaga(),
    ]);
}
