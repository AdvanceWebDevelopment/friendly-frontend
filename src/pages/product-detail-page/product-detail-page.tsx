import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { requestProductDetail } from "../../app/reducers/product-slice";
import { SectionTitle } from "../../components/common/section-title/section-title";
import { DoranCarousel } from "../../components/doran-carousel/doran-carousel";
import { DoranShowroomCarousel } from "../../components/doran-carousel/doran-showroom-carousel";
import { ProductDetail } from "../../components/product-detail/product-detail";
import ProductCard from "../../components/product/ProductCard";
import { Category, Product } from "../../models";
import classes from "./product-detail-page.module.css";

export const ProductDetailPage = () => {
    const { isLoadingProductDetail, productDetail, relatedProducts } = useAppSelector((state) => state.productState);

    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestProductDetail(id!));
    }, [id]);

    return (
        <div className={`pb-5 ${classes["page-wrapper"]}`}>
            <div className={`container`}>
                {isLoadingProductDetail && (
                    <Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />
                )}
                {!isLoadingProductDetail && (
                    <div>
                        <div className={classes["carousel"]}>
                            <DoranShowroomCarousel images={productDetail.images} />
                        </div>

                        <ProductDetail product={productDetail} />

                        <div className="my-5">
                            <SectionTitle text="Sản Phẩm Tương Tự" className="mx-5" />
                            <DoranCarousel>
                                {relatedProducts.map((relatedProduct, index) => {
                                    return <ProductCard key={index} product={relatedProduct} />;
                                })}
                            </DoranCarousel>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
