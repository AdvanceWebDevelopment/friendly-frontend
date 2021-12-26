import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { Product } from "../../models";
import { productService } from "../../services";
import { completeGetProductsByCategoryId } from "../reducers/category-slice";
import {
    completeGetProductDetail,
    completeGetTopFiveEndSoon,
    completeGetTopFiveHottest,
    completeGetTopFiveMostBidded,
    requestProductDetail,
    requestTopFiveEndSoon,
    requestTopFiveHottest,
    requestTopFiveMostBidded,
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

        console.log("Saga take action: ", action);

        const { product, relatedProducts } = yield call(productService.getProductById, parseInt(action.payload));

        yield put(completeGetProductDetail({ productDetail: product, relatedProducts: relatedProducts }));
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
