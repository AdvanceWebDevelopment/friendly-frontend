import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { requestProductsByCategoryId, setSelectedId } from "../../app/reducers/category-slice";
import { Paginator } from "../../components/common/paginator/paginator";
import { CategoryCarousel } from "../../components/doran-carousel/category-carousel";
import FilterSection from "../../components/filter/FilterSection";
import ProductCard from "../../components/product/ProductCard";
import bgImg from "../../assets/images/star-and-cloud.svg";

export const CategoryPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    dispatch(setSelectedId(parseInt(id ?? "1")));

    const { isLoading, categoryProducts, selectedId, totalPages, currentPage } = useAppSelector(
        (state) => state.categoryState,
    );

    useEffect(() => {
        console.log(`Dispatch action for category ${selectedId}`);
        dispatch(requestProductsByCategoryId({ categoryId: selectedId ?? 1, currentPage: 1 }));
    }, [selectedId]);

    const onPaginationClick = (page: number) => {
        dispatch(requestProductsByCategoryId({ categoryId: selectedId ?? 1, currentPage: page }));
    };

    return (
        <div style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="container">
                <CategoryCarousel style={{ marginTop: "-6rem" }} />

                <div className="mb-5">
                    <FilterSection />
                </div>

                <div className="d-flex justify-content-center my-5 py-5">
                    {isLoading && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
                    {!isLoading && (
                        <div>
                            <Row>
                                {categoryProducts.map((product, index) => {
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
