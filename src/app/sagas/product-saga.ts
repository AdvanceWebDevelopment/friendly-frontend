import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { Bid, BidRequest, Product } from "../../models";
import {
    BidProductRequest,
    BidRequestListRequest,
    BidRequestListResponseWithPaging,
    ProductBidHistoryRequest,
    ProductBidHistoryResponseWithPaging,
    productService,
    UpdateProductDescriptionRequest,
} from "../../services";
import { categoryActions } from "../reducers/category-slice";
import { productActions } from "../reducers/product-slice";

function* watchReqestTopFiveProducts() {
    yield all([
        takeLatest(productActions.requestTopFiveMostBidded().type, getTopFive, "most-bids"),
        takeLatest(productActions.requestTopFiveHottest().type, getTopFive, "price"),
        takeLatest(productActions.requestTopFiveEndSoon().type, getTopFive, "date"),
    ]);
}

function* watchRequestProductDetail() {
    while (true) {
        try {
            const action: PayloadAction<string> = yield take(productActions.requestProductDetail.type);

            const { product, relatedProducts } = yield call(productService.getProductById, parseInt(action.payload));

            yield put(
                productActions.completeGetProductDetail({ productDetail: product, relatedProducts: relatedProducts }),
            );
        } catch (error) {}
    }
}

function* watchRequestUploadProduct() {
    while (true) {
        try {
            const action: PayloadAction<Product> = yield take(productActions.requestUploadProduct.type);

            const product: Product = yield call(productService.uploadProduct, action.payload);

            if (!product) {
                alert("Đã có lỗi xảy ra trong quá trình đăng bán. Vui lòng thử lại sau.");
            } else {
                alert("Sản phẩm của bạn đăng bán thành công.");
                yield put(productActions.completeUploadProduct(product));
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
                productActions.requestUpdateProductDescription.type,
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

                yield put(productActions.completeUpdateProductDescription(product));
            } else {
                yield put(productActions.completeUpdateProductDescription(action.payload.product));
                alert("Bổ sung mô tả thất bại. Xin hãy thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestDeleteProduct() {
    while (true) {
        try {
            const action: PayloadAction<Product> = yield take(productActions.requestDeleteProduct.type);

            const product: Product | undefined = yield call(productService.deleteProduct, action.payload);

            if (!product) {
                alert("Đã có lỗi xảy ra trong quá trình xóa sản phẩm. Vui lòng thử lại sau.");
                yield put(productActions.setIsDeletingProduct(undefined));
            } else {
                yield put(productActions.completeDeleteProduct(product));
            }
        } catch (error: any) {
            console.error(error);
        }
    }
}

function* watchRequestBidProduct() {
    while (true) {
        try {
            const action: PayloadAction<BidProductRequest> = yield take(productActions.requestBidProduct.type);

            const bid: Bid | undefined = yield call(productService.bidProduct, action.payload);

            if (!bid) {
                // alert("Đã có lỗi xảy ra trong quá trình ra giá. Vui lòng thử lại sau.");
            } else {
                yield put(productActions.completeBidProduct(bid));
                yield put(categoryActions.updateProductHighestBidder(bid));
            }
        } catch (error: any) {
            console.error(error);
        }
    }
}

function* watchRequestGetProductBidHistory() {
    while (true) {
        try {
            const action: PayloadAction<ProductBidHistoryRequest> = yield take(
                productActions.requestProductBidHistory.type,
            );

            const response: ProductBidHistoryResponseWithPaging | undefined = yield call(
                productService.getProductBidHistory,
                action.payload,
            );

            if (!response) {
                alert("Đã có lỗi xảy ra trong quá trình xem lịch sử. Vui lòng thử lại sau.");
            } else {
                yield put(productActions.completeProductBidHistory(response));
            }
        } catch (error: any) {
            console.error(error);
        }
    }
}

function* watchRequestGetBidRequestList() {
    while (true) {
        try {
            const action: PayloadAction<BidRequestListRequest> = yield take(
                productActions.requestGetBidRequestList.type,
            );

            const response: BidRequestListResponseWithPaging | undefined = yield call(
                productService.getBidRequestList,
                action.payload,
            );

            if (response) {
                yield put(productActions.completeGetBidRequestList(response));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestApproveBidRequest() {
    while (true) {
        try {
            const action: PayloadAction<BidRequest> = yield take(productActions.requestApproveBidRequest.type);

            const response: BidRequest | undefined = yield call(productService.approveBidRequest, action.payload);

            if (response) {
                yield put(productActions.completeApproveBidRequest(response));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestRejectBidRequest() {
    while (true) {
        try {
            const action: PayloadAction<BidRequest> = yield take(productActions.requestRejectBidRequest.type);

            const response: BidRequest | undefined = yield call(productService.rejectBidRequest, action.payload);

            if (response) {
                yield put(productActions.completeRejectBidRequest(response));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestDenyBidderOnProduct() {
    while (true) {
        try {
            const action: PayloadAction<Bid> = yield take(productActions.requestDenyBidderOnProduct.type);

            const response: Bid | undefined = yield call(productService.denyUserBidOnProduct, action.payload);

            if (response) {
                yield put(productActions.completeDenyBidderOnProduct(response));

                yield put(productActions.requestProductDetail(action.payload.product?.id?.toString()!));

                yield put(
                    productActions.requestProductBidHistory({
                        product: action.payload.product,
                    }),
                );
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestAutoBidProduct() {
    while (true) {
        try {
            const action: PayloadAction<BidProductRequest> = yield take(productActions.requestAutoBidProduct.type);

            const response: Bid | undefined = yield call(productService.autoBidProduct, action.payload);

            if (response) {
                yield put(productActions.completeAutoBidProduct(response));
                yield put(categoryActions.updateProductHighestBidder(response));
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
        watchRequestDeleteProduct(),
        watchRequestBidProduct(),
        watchRequestGetProductBidHistory(),
        watchRequestGetBidRequestList(),
        watchRequestApproveBidRequest(),
        watchRequestRejectBidRequest(),
        watchRequestDenyBidderOnProduct(),
        watchRequestAutoBidProduct(),
    ]);
}

function* getTopFive(type: "most-bids" | "date" | "price") {
    try {
        const data: Product[] = yield call(productService.getTopFiveOf, type);

        if (type === "most-bids") {
            yield put(productActions.completeGetTopFiveMostBidded(data));
        } else if (type === "price") {
            yield put(productActions.completeGetTopFiveHottest(data));
        } else {
            yield put(productActions.completeGetTopFiveEndSoon(data));
        }
    } catch (error) {}
}
