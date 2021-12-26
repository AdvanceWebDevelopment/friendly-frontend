import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, take, takeLatest } from "redux-saga/effects";
import { categoryService } from "../../services";
import { completeGetProductsByCategoryId, requestProductsByCategoryId } from "../reducers/category-slice";

export function* watchRequestProductByCategory() {
    while (true) {
        const action: PayloadAction<{ categoryId: number; currentPage: number }> = yield take(
            requestProductsByCategoryId.type,
        );

        console.log(`Saga receive action: ${JSON.stringify(action, null, 2)}`);

        const { categoryId, currentPage } = action.payload as any;
        yield call(getProductByCategoryId, categoryId, currentPage);
    }
}

function* getProductByCategoryId(categoryId: number, currentPage: number) {
    const { products, totalPages } = yield call(categoryService.getProductByCategoryId, categoryId, currentPage - 1);

    yield put(completeGetProductsByCategoryId({ products, totalPages }));
}
