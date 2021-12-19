import { all, fork } from "redux-saga/effects";
import { watchReqestTopFiveProducts } from "./product-saga";

export default function* rootSaga() {
    console.log(`Start root saga`);
    yield all([fork(watchReqestTopFiveProducts)]);
}
