import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth-saga";
import { watchRequestProductByCategory } from "./category-saga";
import { forgotPasswordSaga } from "./forgot-pwd-saga";
import { watchReqestTopFiveProducts, watchRequestProductDetail } from "./product-saga";

export default function* rootSaga() {
    console.log(`Start root saga`);
    yield all([
        fork(watchReqestTopFiveProducts),
        fork(watchRequestProductByCategory),
        fork(watchRequestProductDetail),
        authSaga(),
        forgotPasswordSaga(),
    ]);
}
