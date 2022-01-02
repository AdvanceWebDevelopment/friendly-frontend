import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { requestWatchList } from "../../../app/reducers/user-slice";
import { Paginator } from "../../../components/common/paginator/paginator";
import { apiRoute, pagingConstant } from "../../../constants";
import { Product } from "../../../models";
import { formatPrice } from "../../../utils";

export const FavoriteProducts = () => {
    const { isLoadingWatchList, watchedProducts, watchedProductsTotalPages, watchedProductsCurrentPage } =
        useAppSelector((state) => state.userState);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestWatchList(0));
    }, []);

    const onItemClicked = (product: Product) => {
        navigate(`/${apiRoute.PRODUCT}/${product.id}`);
    };

    const onPaginationClick = (page: number) => {
        dispatch(requestWatchList(page));
    };

    return (
        <div>
            {isLoadingWatchList && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoadingWatchList && (
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Ngày Đăng</th>
                                <th>Ngày Kết Thúc</th>
                                <th>Giá Hiện Tại</th>
                            </tr>
                        </thead>

                        <tbody>
                            {watchedProducts?.map((product, index) => {
                                return (
                                    <tr key={index} onClick={() => onItemClicked(product)}>
                                        <td>
                                            {pagingConstant.PAGE_SIZE * (watchedProductsCurrentPage - 1) + index + 1}
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.postDate?.toLocaleDateString("en-AU")}</td>
                                        <td>{product.endDate?.toLocaleDateString("en-AU")}</td>
                                        <td>{formatPrice(product.currentPrice ?? 0)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
            <div className="mt-5 mb-3">
                <Paginator
                    currentPage={watchedProductsCurrentPage}
                    totalPages={watchedProductsTotalPages}
                    onItemSelected={onPaginationClick}
                    onNextClicked={onPaginationClick}
                    onPrevClicked={onPaginationClick}
                />
            </div>
        </div>
    );
};
