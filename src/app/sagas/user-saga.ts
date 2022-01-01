import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { Product, User, UserRole } from "../../models";
import { productService, userService } from "../../services";
import {
    completeGetUser,
    completeUpdateUser,
    requestAddToWatchList,
    requestUpdateUser,
    requestUser,
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

            const response: boolean = yield call(productService.addToWatchList, action.payload);

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

export function* userSaga() {
    yield all([watchRequestUser(), watchUpdateUser(), watchRequestAddToWatchList()]);
}
