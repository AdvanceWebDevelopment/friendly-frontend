import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { userActions } from "../../../app/reducers/user-slice";
import { Paginator } from "../../../components/common/paginator/paginator";
import { apiRoute, pagingConstant } from "../../../constants";
import { Product } from "../../../models";
import { formatPrice } from "../../../utils";

export const BiddingProducts = () => {
    const { isLoadingBiddingProducts, biddingProducts, currentBiddingProductsPage, totalBiddingProductsPages } =
        useAppSelector((state) => state.userState);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.requestGetBiddingProducts());
    }, []);

    const onItemClicked = (product: Product) => {
        navigate(`/${apiRoute.PRODUCT}/${product.id}`);
    };

    const onPaginationClick = (page: number) => {
        dispatch(userActions.setCurrentBiddingProductsPage(page + 1));
    };

    return (
        <div>
            {isLoadingBiddingProducts && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoadingBiddingProducts && (
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
                            {biddingProducts?.map((bid, index) => {
                                if (
                                    (currentBiddingProductsPage - 1) * pagingConstant.PAGE_SIZE - 1 < index &&
                                    index < currentBiddingProductsPage * pagingConstant.PAGE_SIZE
                                )
                                    return (
                                        <tr key={index} onClick={() => onItemClicked(bid.product ?? {})}>
                                            <td>{index + 1}</td>
                                            <td>{bid.product?.name}</td>
                                            <td>{bid.product?.postDate?.toLocaleDateString("en-AU")}</td>
                                            <td>{bid.product?.endDate?.toLocaleDateString("en-AU")}</td>
                                            <td>{formatPrice(bid.product?.currentPrice ?? 0)}</td>
                                        </tr>
                                    );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}

            <div className="mt-5 mb-3">
                <Paginator
                    currentPage={currentBiddingProductsPage}
                    totalPages={totalBiddingProductsPages}
                    onItemSelected={onPaginationClick}
                    onNextClicked={onPaginationClick}
                    onPrevClicked={onPaginationClick}
                />
            </div>
        </div>
    );
};
