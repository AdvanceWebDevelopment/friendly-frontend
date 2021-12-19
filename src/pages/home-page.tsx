import React from "react";
import Banner from "../components/common/banner/Banner";
import { SectionTitle } from "../components/common/section-title/section-title";
import { DoranCarousel } from "../components/doran-carousel/doran-carousel";
import ProductCard from "../components/product/ProductCard";
import { Image } from "react-bootstrap";
import bgImg1 from "../assets/images/happy-crowd.svg";
import bgImg2 from "../assets/images/green-park.svg";
import bgImg3 from "../assets/images/friends.svg";

export const HomePage = () => {
    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${bgImg1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "50rem",
                    width: "100%",
                    zIndex: 99,
                }}
                className="p-5 my-5"
            >
                {/* <div className="container">
                    <SectionTitle text="NHIỀU NGƯỜI YÊU THÍCH" className="mx-5 my-3" />
                    <DoranCarousel style={{ position: "relative", zIndex: 999 }}>
                        <ProductCard />
                        <ProductCard />
                    </DoranCarousel>
                </div> */}
                <ProductCard />
            </div>

            <Banner bannerMsg="THAM GIA ĐẤU GIÁ THEO DÕI SẢN PHẨM" buttonMsg="ĐĂNG KÝ TÀI KHOẢN" />

            <div
                style={{
                    backgroundImage: `url(${bgImg2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "45rem",
                    width: "100%",
                }}
                className="p-5"
            >
                <div className="container">
                    <SectionTitle text="MỌI NGƯỜI SĂN ĐÓN" className="mx-5 my-3" />
                    <DoranCarousel>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </DoranCarousel>
                </div>
            </div>

            <Banner bannerMsg="BẮT ĐẦU PHIÊN ĐẤU GIÁ CỦA BẠN" buttonMsg="NÂNG CẤP TÀI KHOẢN" />

            <div
                style={{
                    backgroundImage: `url(${bgImg3})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "50rem",
                    width: "100%",
                }}
                className="p-5"
            >
                <div className="container">
                    <SectionTitle text="MỌI NGƯỜI SĂN ĐÓN" className="mx-5 my-3" />
                    <DoranCarousel>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </DoranCarousel>
                </div>
            </div>
        </div>
    );
};
