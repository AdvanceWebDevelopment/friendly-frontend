import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { User } from "../../models";
import { userService } from "../../services";
import { completeGetUser, completeUpdateUser, requestUpdateUser, requestUser } from "../reducers/user-slice";

function* watchRequestUser() {
    while (true) {
        try {
            yield take(requestUser.type);
            const user: User = yield call(userService.getUser);
            yield put(completeGetUser(user));
        } catch (error) {}
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

export function* userSaga() {
    yield all([watchRequestUser(), watchUpdateUser()]);
}
