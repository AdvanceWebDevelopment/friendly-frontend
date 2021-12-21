import React from "react";
import classes from "./product-detail-page.module.css";
import { DoranShowroomCarousel } from "../../components/doran-carousel/doran-showroom-carousel";
import { ProductDetail } from "../../components/product-detail/product-detail";
import { Category, Product } from "../../models";

export const ProductDetailPage = () => {
    const imgs = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];

    const product: Product = {
        name: "Mẫu hạm USS Enterprise",
        category: new Category(1, " Phương TIện Di Chuyển", {
            id: 1,
            name: "Tàu Bè",
        }),
        buyPrice: 500000000,
        currentPrice: 100000,
        postDate: new Date("1-12-2021"),
        endDate: new Date("1-1-2022"),
        stepPrice: 50000,
        seller: {
            name: "Hải Quân Hoa Kỳ",
            points: 9.5,
            avatar: "https://via.placeholder.com/150",
        },
        description: [
            {
                createdAt: new Date(2021, 11, 1),
                content:
                    "Tàu dài 400m, rộng 150m. Chở theo được 20 máy bay chiến đấu F1. Tốc độ tối đa 200 hải lý/giờ. Động cơ sử dụng nguyên liệu hạt nhân hoặc dầu.",
            },
            {
                createdAt: new Date(2021, 11, 7),
                content: "Tặng kèm thủy thủ đoàn.",
            },
            {
                createdAt: new Date(2021, 11, 17),
                content: "Tặng kèm máy bay chiến đấu và phi công.",
            },
            {
                createdAt: new Date(2021, 11, 27),
                content: "Tặng kèm hạm đội hộ tống",
            },
        ],
    };

    return (
        <div className={`pb-5 ${classes["page-wrapper"]}`}>
            <div className={`container`}>
                <div className={classes["carousel"]}>
                    <DoranShowroomCarousel images={imgs} />
                </div>
                <ProductDetail product={product} />
            </div>
        </div>
    );
};
