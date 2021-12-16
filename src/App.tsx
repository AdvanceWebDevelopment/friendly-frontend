import React from "react";
import "./App.css";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Banner from "./components/common/Banner";
import ProductCard from "./components/product/ProductCard";

function App() {
    return (
        <div>
            <Header />
            <Banner />
            <ProductCard />
            <Footer />
        </div>
    );
}

export default App;
