import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { registerService } from "../../services/register-service";
import {
    ActivateRequest,
    ActivateResponse,
    registerActions,
    RegisterRequest,
    RegisterResponse,
    REGISTER_STATUS,
} from "../reducers/register-slice";

function* registerWatcher() {
    while (true) {
        const action: PayloadAction<RegisterRequest> = yield take(registerActions.sendInfo);
        const request: RegisterRequest = action.payload;
        yield call(register, request);
    }
}

function* activateWatcher() {
    while (true) {
        const action: PayloadAction<ActivateRequest> = yield take(registerActions.sendOtp);
        const request: ActivateRequest = action.payload;
        yield call(activate, request);
    }
}

function* register(req: RegisterRequest) {
    try {
        const response: RegisterResponse = yield call(registerService.register, req);
        if (response?.status === REGISTER_STATUS.CREATED) {
            yield put(registerActions.sendInfoSuccess(req.email));
        } else {
            yield put(registerActions.sendFailure("Email đã tồn tại, vui lòng sử dụng email khác."));
        }
    } catch (e) {
        yield put(registerActions.sendFailure("Lỗi hệ thống, vui lòng thử lại sau vài phút"));
    }
}

function* activate(req: ActivateRequest) {
    try {
        const response: RegisterResponse = yield call(registerService.activate, req);
        if (response?.status === REGISTER_STATUS.CREATED) {
            yield put(registerActions.sendInfoSuccess(req.email));
        } else {
            yield put(registerActions.sendFailure("OTP sai, vui lòng thử lại"));
        }
    } catch (e) {
        yield put(registerActions.sendFailure("Lỗi hệ thống, vui lòng thử lại sau vài phút"));
    }
}

export function* registerSaga() {
    yield all([call(registerWatcher), call(activateWatcher)]);
}
