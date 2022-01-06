import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { Category, SubCategory } from "../../models";
import {
    AddSubCategoryRequest,
    categoryService,
    ProductResponseWithPaging,
    productService,
    SearchProductRequest,
} from "../../services";
import { categoryActions } from "../reducers/category-slice";

function* watchGetCategories() {
    while (true) {
        try {
            yield take(categoryActions.requestGetCategories.type);

            const categories: Category[] = yield call(categoryService.getCategories);

            yield put(categoryActions.completeGetCategories(categories));
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestProductByCategory() {
    while (true) {
        try {
            const action: PayloadAction<{ categoryId: number; currentPage: number }> = yield take(
                categoryActions.requestProductsByCategoryId.type,
            );

            const { categoryId, currentPage } = action.payload as any;
            yield call(getProductByCategoryId, categoryId, currentPage);
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestSearchProduct() {
    while (true) {
        try {
            const action: PayloadAction<SearchProductRequest> = yield take(categoryActions.requestSearchProduct.type);

            const data: ProductResponseWithPaging = yield call(productService.search, {
                ...action.payload,
            });

            yield put(categoryActions.completeSearchProduct(data));
        } catch (error) {
            console.error(error);
        }
    }
}

function* getProductByCategoryId(categoryId: number, currentPage: number) {
    const { products, totalPages } = yield call(categoryService.getProductByCategoryId, categoryId, currentPage - 1);

    yield put(categoryActions.completeGetProductsByCategoryId({ products, totalPages }));
}

function* watchRequestAddCategory() {
    while (true) {
        try {
            const action: PayloadAction<Category> = yield take(categoryActions.requestAddCategory.type);

            const response: Category | undefined = yield call(categoryService.addCategory, action.payload);

            if (response) {
                yield put(categoryActions.completeAddCategory(response));
            } else {
                alert("Xảy ra lỗi. Xin thử lại sau.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestDeleteCategory() {
    while (true) {
        try {
            const action: PayloadAction<Category> = yield take(categoryActions.requestDeleteCategory.type);

            const response: Category | undefined = yield call(categoryService.deleteCategory, action.payload);

            if (response) {
                yield put(categoryActions.completeDeleteCategory(response));
            } else {
                alert("Xảy ra lỗi. Xin thử lại sau.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestUpdateCategory() {
    while (true) {
        try {
            const action: PayloadAction<Category> = yield take(categoryActions.requestUpdateCategory.type);

            const response: Category | undefined = yield call(categoryService.updateCategory, action.payload);

            if (response) {
                yield put(categoryActions.completeUpdateCategory(response));
            } else {
                alert("Xảy ra lỗi. Xin thử lại sau.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestAddSubCategory() {
    while (true) {
        try {
            const action: PayloadAction<AddSubCategoryRequest> = yield take(categoryActions.requestAddSubCategory.type);

            const response: SubCategory | undefined = yield call(categoryService.addSubCategory, action.payload);

            if (response) {
                yield put(categoryActions.completeAddSubCategory(response));
            } else {
                alert("Xảy ra lỗi. Xin thử lại sau.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestUpdateSubCategory() {
    while (true) {
        try {
            const action: PayloadAction<AddSubCategoryRequest> = yield take(
                categoryActions.requestUpdateSubCategory.type,
            );

            const response: SubCategory | undefined = yield call(categoryService.updateSubCategory, action.payload);

            if (response) {
                yield put(categoryActions.completeUpdateSubCategory(response));
            } else {
                alert("Xảy ra lỗi. Xin thử lại sau.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestDeleteSubCategory() {
    while (true) {
        try {
            const action: PayloadAction<SubCategory> = yield take(categoryActions.requestDeleteSubCategory.type);

            const response: SubCategory | undefined = yield call(categoryService.deleteSubCategory, action.payload);

            if (response) {
                yield put(categoryActions.completeDeleteSubCategory(response));
            } else {
                alert("Xảy ra lỗi. Xin thử lại sau.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function* categorySaga() {
    yield all([
        watchRequestProductByCategory(),
        watchRequestSearchProduct(),
        watchGetCategories(),
        watchRequestAddCategory(),
        watchRequestDeleteCategory(),
        watchRequestUpdateCategory(),
        watchRequestAddSubCategory(),
        watchRequestUpdateSubCategory(),
        watchRequestDeleteSubCategory(),
    ]);
}
