import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ScrollTopButton } from "./components/scroll-top-button/scroll-top-button";
import { apiRoute } from "./constants/api-routes";
import { CategoryPage, HomePage, LoginPage, ProductDetailPage, ProfilePage, RegisterPage } from "./pages";
import { DoranPage } from "./pages/doran-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={apiRoute.HOME} element={<DoranPage />}>
                    <Route path={apiRoute.HOME} element={<HomePage />} />
                    <Route path={apiRoute.CATEGORY} element={<CategoryPage />}>
                        <Route path=":id" element={<CategoryPage />} />
                    </Route>
                    <Route path={`${apiRoute.PRODUCT}/:id`} element={<ProductDetailPage />} />
                    <Route path={apiRoute.PROFILE} element={<ProfilePage />} />
                    <Route path={apiRoute.LOGIN} element={<LoginPage />} />
                    <Route path={apiRoute.REGISTER} element={<RegisterPage />} />
                </Route>
            </Routes>
            <ScrollTopButton />
        </BrowserRouter>
    );
}

export default App;
