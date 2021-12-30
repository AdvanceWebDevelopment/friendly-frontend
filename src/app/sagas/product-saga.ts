import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { Product } from "../../models";
import { productService } from "../../services";
import {
    completeGetProductDetail,
    completeGetTopFiveEndSoon,
    completeGetTopFiveHottest,
    completeGetTopFiveMostBidded,
    completeUploadProduct,
    requestProductDetail,
    requestTopFiveEndSoon,
    requestTopFiveHottest,
    requestTopFiveMostBidded,
    requestUploadProduct,
} from "../reducers/product-slice";

export function* watchReqestTopFiveProducts() {
    yield all([
        takeLatest(requestTopFiveMostBidded().type, getTopFive, "most-bids"),
        takeLatest(requestTopFiveHottest().type, getTopFive, "price"),
        takeLatest(requestTopFiveEndSoon().type, getTopFive, "date"),
    ]);
}

export function* watchRequestProductDetail() {
    while (true) {
        const action: PayloadAction<string> = yield take(requestProductDetail.type);

        const { product, relatedProducts } = yield call(productService.getProductById, parseInt(action.payload));

        yield put(completeGetProductDetail({ productDetail: product, relatedProducts: relatedProducts }));
    }
}

export function* watchRequestUploadProduct() {
    while (true) {
        const action: PayloadAction<Product> = yield take(requestUploadProduct.type);

        const product: Product | string = yield call(productService.uploadProduct, action.payload);

        if (typeof product === "string") {
            alert(product);
        } else {
            yield put(completeUploadProduct(product));
        }
    }
}

function* getTopFive(type: "most-bids" | "date" | "price") {
    const data: Product[] = yield call(productService.getTopFiveOf, type);

    if (type === "most-bids") {
        yield put(completeGetTopFiveMostBidded(data));
    } else if (type === "price") {
        yield put(completeGetTopFiveHottest(data));
    } else {
        yield put(completeGetTopFiveEndSoon(data));
    }
}
