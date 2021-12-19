import { Icon } from "@iconify/react";
import * as React from "react";
import { Product } from "../../models";
import classes from "./ProductCard.module.css";
import ProductOptions from "./ProductOptions";

/**
 * Product card props include:
 * Product img, name, end date, total bid count,  post date, current bid price, bidder, buy price
 */

export interface ProductCardProps {
    product?: Product;
}

const DUMMY_DATA = {
    img: "../../assets/images/banner.jpg",
    name: "Product very long name but i still want to play game",
    totalBidCount: 72,
    endDate: "end date",
    postDate: "post date",
    currentBidPrice: "2000000",
    bidderImg: "../../assets/images/banner.jpg",
    buyPrice: "2000000",
};

export default function ProductCard() {
    const formatPrice = React.useCallback((price: number) => {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "B" },
            { value: 1e12, symbol: "T" },
        ];
        const item = lookup
            .slice()
            .reverse()
            .find(function (item) {
                return price >= item.value;
            });
        return item ? (price / item.value).toFixed(1) + item.symbol + "VND" : "N/A";
    }, []);

    return (
        <figure className={classes.card}>
            <div className={classes["product-container"]}>
                <div className={classes["product-img"]}></div>
                <div className={classes["product-name"]}>{DUMMY_DATA.name}</div>
                <div className={classes.date}>
                    <div className={classes["end-date"]}>
                        <div>Kết thúc</div>
                        <div className={classes.times}>{DUMMY_DATA.endDate}</div>
                    </div>
                    <div className={classes["post-date"]}>
                        <div>Đăng từ</div>
                        <div className={classes.times}>{DUMMY_DATA.postDate}</div>
                    </div>
                </div>
                <div className={classes["bid-info"]}>
                    <div className={classes["bidder"]}>
                        <div className={classes["bidder-img"]}>
                            <div className={classes["total-bid"]}>
                                {DUMMY_DATA.totalBidCount <= 99 ? DUMMY_DATA.totalBidCount : "99+"}
                            </div>
                        </div>
                        <div className={classes["headings"]}>Giá Hiện Tại</div>
                        <div className={classes.price}>{1}</div>
                    </div>
                    <div className={classes["buy"]}>
                        <Icon icon="emojione-monotone:money-bag" className={classes.icon} width={42} height={45} />
                        <div className={classes["headings"]}>Mua Ngay</div>
                        <div className={classes.price}>{1}</div>
                    </div>
                </div>
                <div className={classes["card-bottom"]}>
                    <button className={classes["btn-bid"]}>
                        <Icon icon="ri:auction-fill" width={24} height={24} className={classes["option-icon"]} />
                        <span>Ra giá</span>
                    </button>
                    <ProductOptions />
                </div>
            </div>
        </figure>
    );
}
