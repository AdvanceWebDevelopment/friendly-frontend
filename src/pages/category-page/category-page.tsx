import React, { useCallback, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { requestSearchProduct, setSelectedCategoryId } from "../../app/reducers/category-slice";
import bgImg from "../../assets/images/star-and-cloud.svg";
import { Paginator } from "../../components/common/paginator/paginator";
import { CategoryCarousel } from "../../components/doran-carousel/category-carousel";
import FilterSection from "../../components/filter/FilterSection";
import ProductCard from "../../components/product/ProductCard";
import { SearchProductRequest } from "../../services";

export const CategoryPage = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { keyword, subCategoryId } = state ?? ({} as any);

    const dispatch = useAppDispatch();

    dispatch(setSelectedCategoryId(parseInt(id ?? "1")));

    const { isLoading, categoryProducts, selectedCategoryId, totalPages, currentPage } = useAppSelector(
        (state) => state.categoryState,
    );

    useEffect(() => {
        dispatch(
            requestSearchProduct({
                keyword: keyword,
                categoryId: selectedCategoryId,
                subCategoryId: subCategoryId,
                page: 0,
            }),
        );
    }, [selectedCategoryId, subCategoryId]);

    const onPaginationClick = (page: number) => {
        dispatch(
            requestSearchProduct({
                keyword: keyword,
                categoryId: selectedCategoryId,
                subCategoryId: subCategoryId,
                page: page,
            }),
        );
    };

    const onSearch = (params: SearchProductRequest) => {
        dispatch(
            requestSearchProduct({
                ...params,
                categoryId: selectedCategoryId,
            }),
        );
    };

    return (
        <div style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="container">
                <CategoryCarousel style={{ marginTop: "-6rem" }} />

                <div className="py-5">
                    {isLoading && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
                    {!isLoading && (
                        <div>
                            <div className="d-flex justify-content-end my-5">
                                <FilterSection onSearch={onSearch} />
                            </div>

                            <div className="d-flex justify-content-center">
                                <Row className="d-flex justify-content-between">
                                    {categoryProducts.map((product, index) => {
                                        return (
                                            <Col key={index} sm={4} className="my-3 ">
                                                <ProductCard product={product} />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
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
