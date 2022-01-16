import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { productActions, requestProductDetail } from "../../app/reducers/product-slice";
import { BidRequestList } from "../../components/bid-request-list/bid-request-list";
import { SectionTitle } from "../../components/common/section-title/section-title";
import { DoranCarousel } from "../../components/doran-carousel/doran-carousel";
import { DoranShowroomCarousel } from "../../components/doran-carousel/doran-showroom-carousel";
import { ProductDetail } from "../../components/product-detail/product-detail";
import ProductCard from "../../components/product/ProductCard";
import { UserRole } from "../../models";
import classes from "./product-detail-page.module.css";

export const ProductDetailPage = () => {
    const {
        isLoadingProductDetail,
        productDetail,
        relatedProducts,

        isLoadingBidRequestList,
        bidRequests,
        currentBidRequestPage,
        totalBidRequestPages,

        deletedProduct,
    } = useAppSelector((state) => state.productState);

    const { user } = useAppSelector((state) => state.userState);

    const { id } = useParams();
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(requestProductDetail(id!));
    }, [id]);

    useEffect(() => {
        if (deletedProduct && productDetail.id === deletedProduct.id) {
            navigate(-1);
        }
    }, [deletedProduct]);

    const [showBidRequestList, setShowBidRequestList] = useState(false);

    useEffect(() => {
        if (user.role !== UserRole.SELLER) {
            setShowBidRequestList(false);
            return;
        }

        if (!user.sellingProducts || !user.sellingProducts.find((p) => p.id === productDetail.id)) {
            setShowBidRequestList(false);
            return;
        }

        setShowBidRequestList(true);

        dispatch(
            productActions.requestGetBidRequestList({
                product: productDetail,
                page: 0,
            }),
        );
    }, [productDetail]);

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

                        {showBidRequestList && (
                            <div>
                                {isLoadingBidRequestList && (
                                    <Spinner animation="border" variant="primary" className="d-block mx-auto my-5" />
                                )}
                                {!isLoadingBidRequestList && (
                                    <BidRequestList
                                        product={productDetail}
                                        bidRequests={bidRequests}
                                        currentPage={currentBidRequestPage}
                                        totalPages={totalBidRequestPages}
                                    />
                                )}
                            </div>
                        )}

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
