import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { CancelDealPayload, requestWonList, cancelDeal } from "../../../app/reducers/user-slice";
import { RootState } from "../../../app/store";
import { ConfirmModal2 } from "../../../components/common/confirm-modal-2/confirm-modal-2";
import { apiRoute } from "../../../constants";
import { Product } from "../../../models";
import { formatPrice } from "../../../utils";
import "../selling-products/selling-products.module.css";

export const WonProducts = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.userState.wonProducts);
    const isLoading = useAppSelector((state: RootState) => state.userState.isLoadingWonProducts);

    const [currentProduct, setCurrentProduct] = useState(0);
    const [currentBidder, setCurrentBidder] = useState(0);
    const [isModalShown, setIsModalShown] = useState(false);

    useEffect(() => {
        dispatch(requestWonList);
    }, []);
    const navigate = useNavigate();

    const onItemClicked = (product: Product) => {
        navigate(`/${apiRoute.PRODUCT}/${product.id}`);
    };

    const handleOnProductClick = (productId: number = 0, bidderId: number = 0) => {
        setCurrentProduct(productId);
        setCurrentBidder(bidderId);
    };

    const onCloseModal = () => {
        setIsModalShown(false);
    };

    const onCancelDeal = () => {
        console.log("Cancel deal");
        const payload: CancelDealPayload = {
            productId: currentProduct,
            bidderId: currentBidder,
        };
        // dispatch(cancelDeal(payload));
    };

    return (
        <div>
            {isLoading && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoading && (
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Loại</th>
                                <th>Giá thắng</th>
                                <th>Người thắng</th>
                                <th>Hủy giao dịch</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products?.map((product, index) => {
                                return (
                                    <tr key={index} onClick={() => onItemClicked(product)}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.subCategory}</td>
                                        <td>{formatPrice(product.currentPrice ?? 0)}</td>
                                        <td>{product.highestBidder?.name}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    handleOnProductClick(product.id, product.highestBidder?.id)
                                                }
                                            >
                                                Hủy
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
            <ConfirmModal2
                show={isModalShown}
                headingTitle="Xác nhận"
                bodyContent="Bạn có chắc muốn hủy giao dịch?"
                onConfirm={onCancelDeal}
                onCancel={onCloseModal}
            />
        </div>
    );
};
