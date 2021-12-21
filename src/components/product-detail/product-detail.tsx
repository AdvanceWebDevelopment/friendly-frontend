import { Icon } from "@iconify/react";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apiRoute } from "../../constants";
import { Product } from "../../models";
import classes from "./product-detail.module.css";

interface ProductDetailProps {
    product: Product;
}

export const ProductDetail = (props: ProductDetailProps) => {
    const { product } = props;

    return (
        <div>
            <Row>
                <Col className={`p-3 mx-2 ${classes["field-content"]}`} sm={9}>
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
                <Col className={`p-3 mx-2 ${classes["field-content"]}`}>Actions</Col>
            </Row>
        </div>
    );
};
