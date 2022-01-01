import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { Product, ProductDescription } from "../../models";
import { productService, UpdateProductDescriptionRequest } from "../../services";
import {
    completeGetProductDetail,
    completeGetTopFiveEndSoon,
    completeGetTopFiveHottest,
    completeGetTopFiveMostBidded,
    completeUpdateProductDescription,
    completeUploadProduct,
    requestProductDetail,
    requestTopFiveEndSoon,
    requestTopFiveHottest,
    requestTopFiveMostBidded,
    requestUpdateProductDescription,
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

            const product: Product = yield call(productService.uploadProduct, action.payload);

            if (!product) {
                alert("Đã có lỗi xảy ra trong quá trình đăng bán. Vui lòng thử lại sau.");
            } else {
                alert("Sản phẩm của bạn đăng bán thành công.");
                yield put(completeUploadProduct(product));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestUpdateProductDescription() {
    while (true) {
        try {
            const action: PayloadAction<UpdateProductDescriptionRequest> = yield take(
                requestUpdateProductDescription.type,
            );

            const response: boolean = yield call(productService.updateProductDescription, action.payload);

            if (response) {
                const product = { ...action.payload.product };
                product.description = [
                    ...(product.description ?? []),
                    {
                        content: action.payload.description,
                        createdAt: new Date(),
                    },
                ];

                yield put(completeUpdateProductDescription(product));
            } else {
                yield put(completeUpdateProductDescription(action.payload.product));
                alert("Bổ sung mô tả thất bại. Xin hãy thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function* productSaga() {
    yield all([
        watchReqestTopFiveProducts(),
        watchRequestProductDetail(),
        watchRequestUploadProduct(),
        watchRequestUpdateProductDescription(),
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
