import { all, call, put, takeLatest } from "redux-saga/effects";
import { Product } from "../../models";
import { productService } from "../../services";
import {
    completeGetTopFiveEndSoon,
    completeGetTopFiveHottest,
    completeGetTopFiveMostBidded,
    requestTopFiveEndSoon,
    requestTopFiveHottest,
    requestTopFiveMostBidded,
} from "../reducers/product-slice";

export function* watchReqestTopFiveProducts() {
    yield all([
        takeLatest(requestTopFiveMostBidded().type, getTopFive, "most-bids"),
        takeLatest(requestTopFiveHottest().type, getTopFive, "price"),
        takeLatest(requestTopFiveEndSoon().type, getTopFive, "date"),
    ]);
}

function* getTopFive(type: "most-bids" | "date" | "price") {
    const data: Product[] = yield call(productService.getTopFiveOf, type);

    if (type === "most-bids") {
        yield put(completeGetTopFiveMostBidded(data));
    } else if (type === "price") {
        yield put(completeGetTopFiveHottest(data));
    } else {
        yield put(completeGetTopFiveEndSoon(data));
    }
}
