import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { categoryService, ProductResponseWithPaging, productService, SearchProductRequest } from "../../services";
import {
    completeGetProductsByCategoryId,
    completeSearchProduct,
    requestProductsByCategoryId,
    requestSearchProduct,
} from "../reducers/category-slice";

function* watchRequestProductByCategory() {
    while (true) {
        try {
            const action: PayloadAction<{ categoryId: number; currentPage: number }> = yield take(
                requestProductsByCategoryId.type,
            );

            const { categoryId, currentPage } = action.payload as any;
            yield call(getProductByCategoryId, categoryId, currentPage);
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
        } catch (error) {
            console.log(error);
        }
    }
}

function* getProductByCategoryId(categoryId: number, currentPage: number) {
    const { products, totalPages } = yield call(categoryService.getProductByCategoryId, categoryId, currentPage - 1);

    yield put(completeGetProductsByCategoryId({ products, totalPages }));
}

export function* categorySaga() {
    yield all([watchRequestProductByCategory(), watchRequestSearchProduct()]);
}
