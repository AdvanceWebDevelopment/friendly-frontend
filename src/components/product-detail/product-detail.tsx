import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apiRoute } from "../../constants";
import { Product } from "../../models";
import { formatPrice } from "../../utils";
import { SectionTitle } from "../common/section-title/section-title";
import { DoranCarousel } from "../doran-carousel/doran-carousel";
import Bidder from "../product/bid-info/Bidder";
import BidButton from "../product/button/BidButton";
import ProductModal from "../product/modal/product/ProductBidModal";
import Heading from "../product/price-heading/Heading";
import ProductCard from "../product/ProductCard";
import ProductOptions from "../product/ProductOptions";
import classes from "./product-detail.module.css";

interface ProductDetailProps {
    product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
    const [showBidModal, setShowBidModal] = useState(false);

    const showBidModalHandler = () => {
        setShowBidModal(true);
    };

    const closeBidModalHandler = () => {
        setShowBidModal(false);
    };

    return (
        <div>
            <Row className="mb-5">
                <Col className={`p-3 mx-2 ${classes["field-content"]}`} sm={9}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Link className={classes["breadcrumb-item"]} to={`/${apiRoute.CATEGORY}/1`}>
                                Danh mục
                            </Link>
                            <span className={`mx-1`}>/</span>
                            <Link
                                className={classes["breadcrumb-item"]}
                                to={`/${apiRoute.CATEGORY}/${product?.category?.id}`}
                            >
                                {product?.category?.name}
                            </Link>
                            <span className={`mx-1`}>/</span>
                            <Link
                                className={classes["breadcrumb-item"]}
                                to={`/${apiRoute.CATEGORY}/${product?.category?.id}/${product?.category?.subCategory?.id}`}
                            >
                                {product?.category?.subCategory?.name}
                            </Link>
                        </div>

                        <div>
                            <ProductOptions />
                        </div>
                    </div>

                    <div>
                        <div className={`${classes["product-name"]}`}>{product?.name}</div>
                    </div>

                    <div className="mb-3">
                        <Image
                            src={product?.seller?.avatar}
                            width={30}
                            className={`rounded-circle mx-1 ${classes["avatar"]}`}
                        />

                        <span className={`${classes["seller-name"]}`}>{product?.seller?.name}</span>

                        <span className={`${classes["middle-dot"]} mx-1`}>•</span>

                        <span className={`${classes["seller-point"]}`}>{product?.seller?.points?.toFixed(1)}</span>

                        <span className={`${classes["middle-dot"]} mx-1`}>•</span>

                        <span className={`${classes["post-date"]}`}>
                            đăng từ {product?.postDate?.toLocaleDateString("en-AU")}
                        </span>
                    </div>

                    <div className={`${classes["product-content-wrapper"]}`}>
                        {product?.description?.map((productDescription, index) => {
                            return (
                                <div key={index} className="my-2">
                                    <div className={`${classes["description-label"]}`}>
                                        <Icon icon="bx:bx-pen" />
                                        <span>{productDescription?.createdAt?.toLocaleDateString("en-AU")}</span>
                                    </div>

                                    <div className={`${classes["description-content"]}`}>
                                        {productDescription?.content}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Col>

                <Col className={`p-3 mx-2 d-inline-block h-25 ${classes["field-content"]}`}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className={`${classes["endDate-label"]}`}>Kết thúc</div>
                        <div className={`${classes["endDate"]}`}>{product?.endDate?.toLocaleDateString("en-AU")}</div>
                        <div className={`${classes["endDate-underline"]}`}></div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center my-1">
                        <Bidder totalBidCount={product?.biddingList?.length ?? 0} />

                        <div className="text-end">
                            <Heading content="Giá hiện tại" color="#6fc47f" />
                            <div className={`${classes["price"]}`}>{formatPrice(product.currentPrice ?? 0)}</div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center my-1">
                        <Icon icon="emojione-monotone:money-bag" color="#ee4730" width={42} height={45} />

                        <div className="text-end">
                            <Heading content="Mua ngay" color="#ee4730" />
                            <div className={`${classes["price"]}`}>{formatPrice(product.buyPrice ?? 0)}</div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <BidButton openModal={showBidModalHandler} />
                        <ProductOptions />
                    </div>
                </Col>
                <ProductModal show={showBidModal} handleClose={closeBidModalHandler} />
            </Row>

            <div className="mt-5">
                <SectionTitle text="Sản Phẩm Cùng Chuyên Mục" />
                <DoranCarousel className="mb-5 pb-5">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </DoranCarousel>
            </div>
        </div>
    );
};
