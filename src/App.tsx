import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { apiRoute } from "./constants/api-routes";
import { CategoryPage } from "./pages/category-page";
import { DoranPage } from "./pages/doran-page";
import { HomePage } from "./pages/home-page";
import { ProfilePage } from "./pages/profile-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={apiRoute.HOME} element={<DoranPage />}>
                    <Route path={apiRoute.HOME} element={<HomePage />} />
                    <Route path={apiRoute.CATEGORY} element={<CategoryPage />}>
                        <Route path=":id" element={<CategoryPage />} />
                    </Route>
                    <Route path={apiRoute.PROFILE} element={<ProfilePage />} />
                </Route>
                <Route path="*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
