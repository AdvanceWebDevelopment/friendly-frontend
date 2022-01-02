import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./app/hook";
import { requestUser } from "./app/reducers/user-slice";
import { ScrollTopButton } from "./components/scroll-top-button/scroll-top-button";
import { apiRoute } from "./constants/api-routes";
import {
    BiddingProducts,
    CategoryPage,
    ExpiredProducts,
    FavoriteProducts,
    HomePage,
    ProductDetailPage,
    ProfilePage,
    SellingProducts,
    UpgradeRequests,
    UserInfo,
    UserPoints,
    UsersList,
    WinningHistory,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    PostProductPage,
    ProductSearchPage,
    CategoryManagement,
} from "./pages";
import { DoranPage } from "./pages/doran-page";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestUser());
    }, []);

    return (
        <BrowserRouter>
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
                    <Route path={apiRoute.PROFILE} element={<ProfilePage />}>
                        <Route path="user-info" element={<UserInfo />} />
                        <Route path="user-points" element={<UserPoints />} />
                        <Route path="favorite-products" element={<FavoriteProducts />} />
                        <Route path="bidding-products" element={<BiddingProducts />} />
                        <Route path="winning-history" element={<WinningHistory />} />
                        <Route path="selling-products" element={<SellingProducts />} />
                        <Route path="expired-products" element={<ExpiredProducts />} />
                        <Route path="category-management" element={<CategoryManagement />} />
                        <Route path="users-list" element={<UsersList />} />
                        <Route path="upgrade-requests" element={<UpgradeRequests />} />
                    </Route>
                    <Route path={apiRoute.POST_PRODUCT} element={<PostProductPage />} />
                </Route>
            </Routes>
            <ScrollTopButton />
        </BrowserRouter>
    );
}

export default App;
