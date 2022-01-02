import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { Product, User, UserRole } from "../../models";
import { ProductResponseWithPaging, UserResponseWithPaging, userService } from "../../services";
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

            const response: UserResponseWithPaging | undefined = yield call(
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
            const action: PayloadAction<string> = yield take(upgrade);

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

export function* userSaga() {
    yield all([
        watchRequestUser(),
        watchUpdateUser(),
        watchRequestAddToWatchList(),
        watchRequestWatchList(),
        watchRequestListSellers(),
        watchRequestListUpgrade(),
        watchUpgradeUser(),
        watchDowngradeUser(),
    ]);
}
