import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { Product } from "../../models";
import { ProductResponseWithPaging, productService, SearchProductRequest } from "../../services";
import {
    completeGetProductDetail,
    completeGetTopFiveEndSoon,
    completeGetTopFiveHottest,
    completeGetTopFiveMostBidded,
    completeSearchProduct,
    completeUploadProduct,
    requestProductDetail,
    requestSearchProduct,
    requestTopFiveEndSoon,
    requestTopFiveHottest,
    requestTopFiveMostBidded,
    requestUploadProduct,
} from "../reducers/product-slice";

function* watchReqestTopFiveProducts() {
    yield all([
        takeLatest(requestTopFiveMostBidded().type, getTopFive, "most-bids"),
        takeLatest(requestTopFiveHottest().type, getTopFive, "price"),
        takeLatest(requestTopFiveEndSoon().type, getTopFive, "date"),
    ]);
}

function* watchRequestProductDetail() {
    while (true) {
        try {
            const action: PayloadAction<string> = yield take(requestProductDetail.type);

            const { product, relatedProducts } = yield call(productService.getProductById, parseInt(action.payload));

            yield put(completeGetProductDetail({ productDetail: product, relatedProducts: relatedProducts }));
        } catch (error) {}
    }
}

function* watchRequestUploadProduct() {
    while (true) {
        try {
            const action: PayloadAction<Product> = yield take(requestUploadProduct.type);

            const product: Product | string = yield call(productService.uploadProduct, action.payload);

            if (typeof product === "string") {
                alert(product);
            } else {
                yield put(completeUploadProduct(product));
            }
        } catch (error) {}
    }
}

function* watchRequestSearchProduct() {
    while (true) {
        try {
            const action: PayloadAction<SearchProductRequest> = yield take(requestSearchProduct.type);

            const data: ProductResponseWithPaging = yield call(productService.search, {
                ...action.payload,
            });

            yield put(completeSearchProduct(data));
        } catch (error) {}
    }
}

export function* productSaga() {
    yield all([
        watchReqestTopFiveProducts(),
        watchRequestProductDetail(),
        watchRequestUploadProduct(),
        watchRequestSearchProduct(),
    ]);
}

function* getTopFive(type: "most-bids" | "date" | "price") {
    try {
        const data: Product[] = yield call(productService.getTopFiveOf, type);

        if (type === "most-bids") {
            yield put(completeGetTopFiveMostBidded(data));
        } else if (type === "price") {
            yield put(completeGetTopFiveHottest(data));
        } else {
            yield put(completeGetTopFiveEndSoon(data));
        }
    } catch (error) {}
}
