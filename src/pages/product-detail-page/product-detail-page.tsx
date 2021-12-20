import React from "react";
import classes from "./product-detail-page.module.css";
import { DoranShowroomCarousel } from "../../components/doran-carousel/doran-showroom-carousel";

export const ProductDetailPage = () => {
    const imgs = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];
    return (
        <div className="container">
            <div className={classes["carousel"]}>
                <DoranShowroomCarousel images={imgs} />
            </div>
        </div>
    );
};
