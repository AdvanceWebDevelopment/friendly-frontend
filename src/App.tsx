import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SockJsClient from "react-stomp";
import "./App.css";
import { useAppDispatch } from "./app/hook";
import { updateProductHighestBidder } from "./app/reducers/category-slice";
import { updateHighestBidder } from "./app/reducers/product-slice";
import { requestUser } from "./app/reducers/user-slice";
import { ScrollTopButton } from "./components/scroll-top-button/scroll-top-button";
import { webSocketConstants } from "./constants";
import { apiRoute } from "./constants/api-routes";
import { Bid } from "./models";
import {
    BiddingProducts,
    CategoryManagement,
    CategoryPage,
    ExpiredProducts,
    FavoriteProducts,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    PostProductPage,
    ProductDetailPage,
    ProductSearchPage,
    ProfilePage,
    RegisterPage,
    SellingProducts,
    UpgradeRequests,
    UserInfo,
    UserPoints,
    UsersList,
    WinningHistory,
    WonProducts,
} from "./pages";
import { DoranPage } from "./pages/doran-page";
import { ListSellers } from "./pages/profile-page/list-sellers/list-sellers";
import { MyWonProducts } from "./pages/profile-page/my-won-products/my-won-products";
import { ChangePasswordPage } from "./pages/reset-password-page/change-password-page";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestUser());
    }, []);

    let onConnected = () => {
        console.log("Connected!!");
    };

    let onMessageReceived = (payload: any) => {
        const bid = Bid.fromData(payload.message);

        dispatch(updateProductHighestBidder(bid));
        dispatch(updateHighestBidder(bid));
    };

    return (
        <BrowserRouter>
            <SockJsClient
                url={webSocketConstants.WEB_SOCKET_HOST}
                topics={[webSocketConstants.BID_HISTORY_TOPIC]}
                onConnect={() => onConnected()}
                onMessage={(msg: any) => onMessageReceived(msg)}
                autoReconnect
            />
            <Routes>
                <Route path={apiRoute.HOME} element={<DoranPage />}>
                    <Route path={apiRoute.HOME} element={<HomePage />} />
                    <Route path={apiRoute.CATEGORY} element={<CategoryPage />}>
                        <Route path=":id" element={<CategoryPage />} />
                    </Route>
                    <Route path={apiRoute.PRODUCT} element={<ProductSearchPage />} />
                    <Route path={`${apiRoute.PRODUCT}/:id`} element={<ProductDetailPage />} />
                    <Route path={apiRoute.PROFILE} element={<ProfilePage />} />
                    <Route path={apiRoute.LOGIN} element={<LoginPage />} />
                    <Route path={apiRoute.REGISTER} element={<RegisterPage />} />
                    <Route path={apiRoute.FORGOT} element={<ForgotPasswordPage />} />
                    <Route path={apiRoute.CHANGE} element={<ChangePasswordPage />} />
                    <Route path={apiRoute.PROFILE} element={<ProfilePage />}>
                        <Route path="user-info" element={<UserInfo />} />
                        <Route path="user-points" element={<UserPoints />} />
                        <Route path="favorite-products" element={<FavoriteProducts />} />
                        <Route path="bidding-products" element={<BiddingProducts />} />
                        <Route path="winning-history" element={<WinningHistory />} />
                        <Route path="selling-products" element={<SellingProducts />} />
                        <Route path="won-products" element={<WonProducts />} />
                        <Route path="expired-products" element={<ExpiredProducts />} />
                        <Route path="category-management" element={<CategoryManagement />} />
                        <Route path="users-list" element={<UsersList />} />
                        <Route path="upgrade-requests" element={<UpgradeRequests />} />
                        <Route path="list-sellers" element={<ListSellers />} />
                        <Route path="my-won-products" element={<MyWonProducts />} />
                    </Route>
                    <Route path={apiRoute.POST_PRODUCT} element={<PostProductPage />} />
                </Route>
            </Routes>
            <ScrollTopButton />
        </BrowserRouter>
    );
}

export default App;
