import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { Bid, Product, User, UserRole } from "../../models";
import {
    EvaluationResponseWithPaging,
    ProductResponseWithPaging,
    productService,
    UpgradeResponseWithPaging,
    UserResponseWithPaging,
    userService,
} from "../../services";
import { ReviewPayload, userActions, UserReviewPayload } from "../reducers/user-slice";

function* watchRequestUser() {
    while (true) {
        try {
            yield take(userActions.requestUser.type);
            const user: User | undefined = yield call(userService.getUser);

            if (!user) {
                return;
            }

            if (user.role === UserRole.SELLER) {
                user.sellingProducts = yield call(userService.getUserSellingProducts);
            }

            yield put(userActions.completeGetUser(user));

            yield put(userActions.completeGetBiddingProducts);
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchUpdateUser() {
    while (true) {
        try {
            const action: PayloadAction<User> = yield take(userActions.requestUpdateUser.type);

            const successful: boolean = yield call(userService.updateUser, action.payload);

            if (!successful) {
                alert("Có lỗi xảy ra. Xin hãy thử lại sau");
            }

            yield put(userActions.completeUpdateUser(action.payload));
        } catch (error) {}
    }
}

function* watchRequestAddToWatchList() {
    while (true) {
        try {
            const action: PayloadAction<Product> = yield take(userActions.requestAddToWatchList);

            const response: boolean = yield call(userService.addToWatchList, action.payload);

            if (response) {
                alert("Thêm vào danh sách theo dõi thành công");
            } else {
                alert("Theo dõi sản phẩm thất bại. Xin hãy thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestWatchList() {
    while (true) {
        try {
            const action: PayloadAction<number> = yield take(userActions.requestWatchList);

            const response: ProductResponseWithPaging | undefined = yield call(
                userService.getFavoriteProducts,
                action.payload,
            );

            if (response) {
                yield put(userActions.completeGetWatchList(response));
            } else {
                alert("Có lỗi xảy ra khi lấy danh sách yêu thích. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestWonList() {
    while (true) {
        try {
            yield take(userActions.requestWonList.type);
            const response: Product[] | undefined = yield call(userService.getUserWonProducts);
            if (response) {
                yield put(userActions.completeGetWonList(response));
            } else {
                alert("Có lỗi xảy ra khi lấy danh sách sản phẩm đã có người đấu giá thắng. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchCancelDeal() {
    while (true) {
        try {
            const action: PayloadAction<UserReviewPayload> = yield take(userActions.cancelDeal);
            const response: string | undefined = yield call(
                userService.cancelDeal,
                action.payload.productId,
                action.payload.userId,
            );
            if (response) {
                yield put(userActions.completeCancelDeal);
            } else {
                alert("Có lỗi xảy ra khi hủy giao dịch");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchSendReviewToBidder() {
    while (true) {
        try {
            const action: PayloadAction<ReviewPayload> = yield take(userActions.sendReviewToBidder);
            const response: string | undefined = yield call(
                userService.sendReviewToBidder,
                action.payload.productInfo.productId,
                action.payload.productInfo.userId,
                action.payload.reviewInfo,
            );
            if (response) {
                yield put(userActions.completeSendReviewToBidder);
                alert("Gửi đánh giá thành công");
            } else {
                alert("Có lỗi khi gửi nhận xét");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchSendReviewToSeller() {
    while (true) {
        try {
            const action: PayloadAction<ReviewPayload> = yield take(userActions.sendReviewToSeller);
            const response: string | undefined = yield call(
                userService.sendReviewToSeller,
                action.payload.productInfo.productId,
                action.payload.productInfo.userId,
                action.payload.reviewInfo,
            );
            if (response) {
                yield put(userActions.completeSendReviewToSeller);
                alert("Gửi đánh giá thành công");
            } else {
                alert("Có lỗi khi gửi nhận xét");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestListSellers() {
    while (true) {
        try {
            const action: PayloadAction<number> = yield take(userActions.requestListSeller);

            const response: UserResponseWithPaging | undefined = yield call(userService.getListSellers, action.payload);
            if (response) {
                yield put(userActions.completeGetListSeller(response));
            } else {
                alert("Có lỗi xảy ra khi lấy danh sách người bán. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestListUpgrade() {
    while (true) {
        try {
            const action: PayloadAction<number> = yield take(userActions.requestListUpgrade);

            const response: UpgradeResponseWithPaging | undefined = yield call(
                userService.getListRequestUpgrade,
                action.payload,
            );

            if (response) {
                yield put(userActions.completeGetListUpgrade(response));
            } else {
                alert("Có lỗi xảy ra khi lấy danh sách yếu cầu nâng cấp tài khoản. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchUpgradeUser() {
    while (true) {
        try {
            const action: PayloadAction<string> = yield take(userActions.upgrade);

            const response: string | undefined = yield call(userService.upgrade, action.payload);

            if (response) {
                yield put(userActions.completeUpgrade());
            } else {
                alert("Có lỗi xảy ra khi nâng cấp người dùng");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchDowngradeUser() {
    while (true) {
        try {
            const action: PayloadAction<string> = yield take(userActions.downgrade);
            const response: string | undefined = yield call(userService.downgrade, action.payload);

            if (response) {
                yield put(userActions.completeDowngrade());
            } else {
                alert("Có lỗi xảy ra khi giảm cấp người dùng");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestGetUserList() {
    while (true) {
        try {
            const action: PayloadAction<number> = yield take(userActions.requestGetUserList.type);

            const response: UserResponseWithPaging | undefined = yield call(userService.getUserList, action.payload);
            if (response) {
                yield put(userActions.completeGetUserList(response));
            } else {
                alert("Có lỗi xảy ra khi lấy danh sách người dùng. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestCreateUser() {
    while (true) {
        try {
            const action: PayloadAction<User> = yield take(userActions.requestCreateUser.type);

            const response: User | undefined = yield call(userService.createUser, action.payload);

            if (response) {
                yield put(userActions.completeCreateUser(response));
            } else {
                alert("Có lỗi xảy ra khi tạo người dùng. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestAdminUpdateUser() {
    while (true) {
        try {
            const action: PayloadAction<User> = yield take(userActions.requestAdminUpdateUser.type);

            const response: User | undefined = yield call(userService.adminUpdateUser, action.payload);

            if (response) {
                yield put(userActions.completeAdminUpdateUser(response));
            } else {
                alert("Có lỗi xảy ra khi cập nhật người dùng. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestDeleteUser() {
    while (true) {
        try {
            const action: PayloadAction<User> = yield take(userActions.requestDeleteUser.type);

            const response: User | undefined = yield call(userService.deleteUser, action.payload);
            if (response) {
                yield put(userActions.completeDeleteUser(response));
            } else {
                alert("Có lỗi xảy ra khi xóa người dùng. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestWinningHistory() {
    while (true) {
        try {
            const action: PayloadAction<number> = yield take(userActions.requestWinningHistory.type);
            const response: ProductResponseWithPaging | undefined = yield call(
                userService.getWinningHistory,
                action.payload,
            );

            if (response) {
                yield put(userActions.completeGetWinningHistory(response));
            } else {
                alert("Có lỗi xảy ra khi tải danh sách sản phẩm thắng cược. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestEvaluations() {
    while (true) {
        try {
            const action: PayloadAction<number> = yield take(userActions.requestEvaluations.type);
            const response: EvaluationResponseWithPaging | undefined = yield call(
                userService.getEvaluation,
                action.payload,
            );
            if (response) {
                yield put(userActions.completeGetEvaluations(response));
            } else {
                alert("Có lỗi xảy ra khi lấy danh sách đánh giá. Xin thử lại sau");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestGetBiddingProducts() {
    while (true) {
        try {
            yield take(userActions.requestGetBiddingProducts.type);

            const response: Bid[] | undefined = yield call(productService.getBiddingProducts);

            if (!response) {
                alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            } else {
                yield put(userActions.completeGetBiddingProducts(response));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchBuyProducts() {
    while (true) {
        try {
            const action: PayloadAction<Product> = yield take(userActions.requestBuyProduct.type);

            const response: Product | undefined = yield call(productService.buyProduct, action.payload);

            if (!response) {
                alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            } else {
                yield put(userActions.completeBuyProduct(response));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestToBidProduct() {
    while (true) {
        try {
            const action: PayloadAction<Product> = yield take(userActions.requestToBidProduct.type);

            const response: Product | undefined = yield call(productService.requestToBidProduct, action.payload);

            if (!response) {
                alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            } else {
                yield put(userActions.completeRequestToBidProduct(response));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchRequestUpgrade() {
    while (true) {
        try {
            yield take(userActions.requestUpgrade);
            const response: string | undefined = yield call(userService.sendUpgradeRequest);
            if (response) {
                yield put(userActions.completeRequestUpgrade());
                alert("Gửi yêu cầu nâng cấp tài khoản thành công");
            } else {
                alert("Lỗi xảy ra khi gửi yêu cầu nâng cấp tài khoản");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function* userSaga() {
    yield all([
        watchRequestUser(),
        watchUpdateUser(),
        watchRequestAddToWatchList(),
        watchRequestWatchList(),
        watchRequestWonList(),
        watchCancelDeal(),
        watchSendReviewToBidder(),
        watchSendReviewToSeller(),
        watchRequestListSellers(),
        watchRequestListUpgrade(),
        watchUpgradeUser(),
        watchDowngradeUser(),
        watchRequestGetUserList(),
        watchRequestCreateUser(),
        watchRequestAdminUpdateUser(),
        watchRequestDeleteUser(),
        watchRequestWinningHistory(),
        watchRequestEvaluations(),
        watchRequestGetBiddingProducts(),
        watchBuyProducts(),
        watchRequestToBidProduct(),
        watchRequestUpgrade(),
    ]);
}
