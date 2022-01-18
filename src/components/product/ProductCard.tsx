import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import duration from "dayjs/plugin/duration";
import * as React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { productActions } from "../../app/reducers/product-slice";
import { apiRoute, timeConstants } from "../../constants";
import { Product } from "../../models";
import { formatPrice } from "../../utils";
import Bidder from "./bid-info/Bidder";
import BidButton from "./button/BidButton";
import ProductModal from "./modal/product/ProductBidModal";
import Heading from "./price-heading/Heading";
import classes from "./ProductCard.module.css";
import ProductOptions from "./ProductOptions";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.extend(duration);

dayjs.updateLocale("en", {
    relativeTime: {
        future: "Trong %s",
        past: "%s trước",
        s: "Vài giây",
        m: "1 phút",
        mm: "%d minutes",
        h: "1 giờ",
        hh: "%d giờ",
        d: "1 ngày",
        dd: "%d ngày",
        M: "1 tháng",
        MM: "%d tháng",
        y: "1 năm",
        yy: "%d năm",
    },
});

dayjs.duration({ months: 12 });

export interface ProductCardProps {
    product?: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();

    const [showBidModal, setShowBidModal] = React.useState(false);
    const [isNewProd, setIsNewProd] = React.useState(false);

    const { deletedProduct } = useAppSelector((state) => state.productState);

    const showBidModalHandler = () => {
        setShowBidModal(true);
    };

    const closeBidModalHandler = () => {
        setShowBidModal(false);
    };

    const onSubmitBid = (price: number, mode: number) => {
        // Manual bid
        if (mode === 0) {
            dispatch(
                productActions.requestBidProduct({
                    product,
                    price,
                }),
            );
        } else {
            dispatch(
                productActions.requestAutoBidProduct({
                    product,
                    price,
                }),
            );
        }

        closeBidModalHandler();
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

    const renderRelativeEndDate = (endDate?: Date) => {
        const tmp = dayjs(endDate).add(dayjs.duration(7, "h"));
        const delta = dayjs(tmp).diff(new Date(), "minute");

        if (delta < 3 * 24 * 60) {
            return dayjs(Date.now()).to(tmp);
        }

        return endDate?.toLocaleDateString("en-AU");
    };

    const navigate = useNavigate();

    const onProductClick = () => {
        navigate(`/${apiRoute.PRODUCT}/${product?.id}`);
    };

    return (
        <>
            {deletedProduct?.id !== product?.id && (
                <div>
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
                                    <div className={classes.times}>{renderRelativeEndDate(product?.endDate)}</div>
                                </div>
                                <div className={classes["post-date"]}>
                                    <div>Đăng từ</div>
                                    <div className={classes.times}>
                                        {product?.postDate?.toLocaleDateString("en-AU")}
                                    </div>
                                </div>
                            </div>
                            <div className={classes["bid-info"]}>
                                <div className={classes["bidder"]}>
                                    <Bidder totalBidCount={product?.currentBids ?? 0} bidder={product?.highestBidder} />
                                    <Heading content="Giá hiện tại" color="#6fc47f" />
                                    <div className={classes.price}>{formatPrice(product?.currentPrice ?? 0)}</div>
                                </div>
                                <div className={classes["buy"]}>
                                    <Icon
                                        icon="emojione-monotone:money-bag"
                                        className={classes.icon}
                                        width={42}
                                        height={45}
                                    />
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
                    <ProductModal
                        show={showBidModal}
                        handleClose={closeBidModalHandler}
                        product={product}
                        onConfirm={onSubmitBid}
                    />
                </div>
            )}
        </>
    );
}
