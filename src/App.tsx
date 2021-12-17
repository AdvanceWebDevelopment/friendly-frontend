import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CategoryPage } from "./pages/category-page";
import { DoranPage } from "./pages/doran-page";
import { HomePage } from "./pages/home-page";
import { ProfilePage } from "./pages/profile-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DoranPage />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
