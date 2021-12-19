import { call, put, takeLatest } from "redux-saga/effects";
import { Product } from "../../models";
import { productService } from "../../services";
import { completeGetTopFiveNewest, requestTopFiveNewest } from "../reducers/product-slice";

export function* watchReqestTopFiveProducts() {
    console.log(`watchReqestTopFiveProducts`);
    yield takeLatest(requestTopFiveNewest().type, getTopFiveNewest);
}

function* getTopFiveNewest() {
    const products: Product[] = yield call(productService.getTopFiveOf, "date");
    yield put(completeGetTopFiveNewest(products));
}
