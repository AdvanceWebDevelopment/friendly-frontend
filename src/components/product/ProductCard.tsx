import { Icon } from "@iconify/react";
import * as React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiRoute, timeConstants } from "../../constants";
import { Product } from "../../models";
import { formatPrice } from "../../utils";
import Bidder from "./bid-info/Bidder";
import BidButton from "./button/BidButton";
import ProductModal from "./modal/product/ProductBidModal";
import Heading from "./price-heading/Heading";
import classes from "./ProductCard.module.css";
import ProductOptions from "./ProductOptions";
import dayjs from "dayjs";

/**
 * Product card props include:
 * Product img, name, end date, total bid count,  post date, current bid price, bidder, buy price
 */

export interface ProductCardProps {
    product?: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [showBidModal, setShowBidModal] = React.useState(false);
    const [isNewProd, setIsNewProd] = React.useState(false);

    const showBidModalHandler = () => {
        setShowBidModal(true);
    };

    const closeBidModalHandler = () => {
        setShowBidModal(false);
    };

    React.useEffect(() => {
        if (product?.postDate) {
            const delta = dayjs(new Date()).diff(product?.postDate, "minute") - timeConstants.TIMEZONE_DIFF_MINUTE;

            if (delta < 30) {
                setIsNewProd(true);
            } else {
                setIsNewProd(false);
            }
        }
    }, [product]);

    const navigate = useNavigate();

    const onProductClick = () => {
        navigate(`/${apiRoute.PRODUCT}/${product?.id}`);
    };

    return (
        <>
            <figure className={`mb-2 ${classes.card}`}>
                {isNewProd && (
                    <div className={classes["new-badge"]}>
                        <span className={classes["badge-content"]}>NEW</span>
                    </div>
                )}
                <div className={classes["product-container"]}>
                    <div>
                        <Image
                            className={classes["product-img"]}
                            src={product?.images ? product?.images[0] : ""}
                            width={"100%"}
                        />
                    </div>
                    <div className={classes["product-name"]} onClick={onProductClick}>
                        {product?.name}
                    </div>
                    <div className={classes.date}>
                        <div className={classes["end-date"]}>
                            <div>Kết thúc</div>
                            <div className={classes.times}>{product?.endDate?.toLocaleDateString("en-AU")}</div>
                        </div>
                        <div className={classes["post-date"]}>
                            <div>Đăng từ</div>
                            <div className={classes.times}>{product?.postDate?.toLocaleDateString("en-AU")}</div>
                        </div>
                    </div>
                    <div className={classes["bid-info"]}>
                        <div className={classes["bidder"]}>
                            <Bidder totalBidCount={product?.currentBids ?? 0} bidder={product?.highestBidder} />
                            <Heading content="Giá hiện tại" color="#6fc47f" />
                            <div className={classes.price}>{formatPrice(product?.currentPrice ?? 0)}</div>
                        </div>
                        <div className={classes["buy"]}>
                            <Icon icon="emojione-monotone:money-bag" className={classes.icon} width={42} height={45} />
                            <Heading content="Mua ngay" color="#ee4730" />
                            <div className={classes.price}>{formatPrice(product?.buyPrice ?? 0)}</div>
                        </div>
                    </div>
                    <div className={classes["card-bottom"]}>
                        <BidButton openModal={showBidModalHandler} />
                        <ProductOptions product={product ?? {}} />
                    </div>
                </div>
            </figure>
            <ProductModal show={showBidModal} handleClose={closeBidModalHandler} />
        </>
    );
}
