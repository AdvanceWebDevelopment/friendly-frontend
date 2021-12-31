import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { requestSearchProduct } from "../../app/reducers/category-slice";
import bgImg from "../../assets/images/star-and-cloud.svg";
import { Paginator } from "../../components/common/paginator/paginator";
import { CategoryCarousel } from "../../components/doran-carousel/category-carousel";
import ProductCard from "../../components/product/ProductCard";

export const ProductSearchPage = () => {
    const { state } = useLocation();
    const { keyword, categoryId, subCategoryId } = state as any;

    const { isSearchingProduct, searchedProducts, currentPage, totalPages } = useAppSelector(
        (state) => state.productState,
    );

    const dispatch = useAppDispatch();

    const onPaginationClick = (page: number) => {
        dispatch(
            requestSearchProduct({
                keyword: keyword,
                categoryId: categoryId,
                subCategoryId: subCategoryId,
                page: page - 1,
            }),
        );
    };

    return (
        <div style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="container">
                <CategoryCarousel style={{ marginTop: "-6rem" }} />

                <div className="d-flex justify-content-center my-5 py-5">
                    {isSearchingProduct && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
                    {!isSearchingProduct && (
                        <div>
                            <Row className="d-flex justify-content-between">
                                {searchedProducts.map((product, index) => {
                                    return (
                                        <Col key={index} sm={4} className="my-3">
                                            <ProductCard product={product} />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    )}
                </div>
                <div>
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onItemSelected={onPaginationClick}
                        onNextClicked={onPaginationClick}
                        onPrevClicked={onPaginationClick}
                    />
                </div>
            </div>
        </div>
    );
};
