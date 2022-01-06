import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { Product, User, UserRole } from "../../models";
import {
    ProductResponseWithPaging,
    UpgradeResponseWithPaging,
    UserResponseWithPaging,
    userService,
} from "../../services";
import {
    completeDowngrade,
    completeGetListSeller,
    completeGetListUpgrade,
    completeGetUser,
    completeGetWatchList,
    completeUpdateUser,
    completeUpgrade,
    requestAddToWatchList,
    requestListSeller,
    requestListUpgrade,
    requestUpdateUser,
    requestUser,
    requestWatchList,
    upgrade,
    downgrade,
    requestWonList,
    completeGetWonList,
    cancelDeal,
    WinnerPayload,
    completeCancelDeal,
    ReviewPayload,
    sendReview,
    completeSendReview,
    requestGetUserList,
    completeGetUserList,
    requestCreateUser,
    completeCreateUser,
    requestAdminUpdateUser,
    completeAdminUpdateUser,
    requestDeleteUser,
    completeDeleteUser,
} from "../reducers/user-slice";

function* watchRequestUser() {
    while (true) {
        try {
            yield take(requestUser.type);
            const user: User = yield call(userService.getUser);

            if (user && user.role !== UserRole.BIDDER) {
                user.sellingProducts = yield call(userService.getUserSellingProducts);
            }

            yield put(completeGetUser(user));
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchUpdateUser() {
    while (true) {
        try {
            const action: PayloadAction<User> = yield take(requestUpdateUser.type);

            const successful: boolean = yield call(userService.updateUser, action.payload);

            if (!successful) {
                alert("Có lỗi xảy ra. Xin hãy thử lại sau");
            }

            yield put(completeUpdateUser(action.payload));
        } catch (error) {}
    }
}

function* watchRequestAddToWatchList() {
    while (true) {
        try {
            const action: PayloadAction<Product> = yield take(requestAddToWatchList);

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
            const action: PayloadAction<number> = yield take(requestWatchList);

            const response: ProductResponseWithPaging | undefined = yield call(
                userService.getFavoriteProducts,
                action.payload,
            );

            if (response) {
                yield put(completeGetWatchList(response));
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
            yield take(requestWonList.type);
            const response: Product[] | undefined = yield call(userService.getUserWonProducts);
            if (response) {
                yield put(completeGetWonList(response));
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
            const action: PayloadAction<WinnerPayload> = yield take(cancelDeal);
            const response: string | undefined = yield call(
                userService.cancelDeal,
                action.payload.productId,
                action.payload.bidderId,
            );
            if (response) {
                yield put(completeCancelDeal);
            } else {
                alert("Có lỗi xảy ra khi hủy giao dịch");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function* watchSendReview() {
    while (true) {
        try {
            const action: PayloadAction<ReviewPayload> = yield take(sendReview);
            const response: string | undefined = yield call(
                userService.sendReview,
                action.payload.productInfo.productId,
                action.payload.productInfo.bidderId,
                action.payload.reviewInfo,
            );
            if (response) {
                yield put(completeSendReview);
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
            const action: PayloadAction<number> = yield take(requestListSeller);

            const response: UserResponseWithPaging | undefined = yield call(userService.getListSellers, action.payload);
            if (response) {
                yield put(completeGetListSeller(response));
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
            const action: PayloadAction<number> = yield take(requestListUpgrade);

            const response: UpgradeResponseWithPaging | undefined = yield call(
                userService.getListRequestUpgrade,
                action.payload,
            );

            if (response) {
                yield put(completeGetListUpgrade(response));
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
            const action: PayloadAction<string> = yield take(upgrade);

            const response: string | undefined = yield call(userService.upgrade, action.payload);

            if (response) {
                yield put(completeUpgrade());
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
            const action: PayloadAction<string> = yield take(downgrade);
            const response: string | undefined = yield call(userService.downgrade, action.payload);

            if (response) {
                yield put(completeDowngrade());
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
            const action: PayloadAction<number> = yield take(requestGetUserList.type);

            const response: UserResponseWithPaging | undefined = yield call(userService.getUserList, action.payload);
            if (response) {
                yield put(completeGetUserList(response));
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
            const action: PayloadAction<User> = yield take(requestCreateUser.type);

            const response: User | undefined = yield call(userService.createUser, action.payload);

            if (response) {
                yield put(completeCreateUser(response));
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
            const action: PayloadAction<User> = yield take(requestAdminUpdateUser.type);

            const response: User | undefined = yield call(userService.adminUpdateUser, action.payload);

            if (response) {
                yield put(completeAdminUpdateUser(response));
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
            const action: PayloadAction<User> = yield take(requestDeleteUser.type);

            const response: User | undefined = yield call(userService.deleteUser, action.payload);

            if (response) {
                yield put(completeDeleteUser(response));
            } else {
                alert("Có lỗi xảy ra khi xóa người dùng. Xin thử lại sau");
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
        watchSendReview(),
        watchRequestListSellers(),
        watchRequestListUpgrade(),
        watchUpgradeUser(),
        watchDowngradeUser(),
        watchRequestGetUserList(),
        watchRequestCreateUser(),
        watchRequestAdminUpdateUser(),
        watchRequestDeleteUser(),
    ]);
}
