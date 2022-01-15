import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { UserReviewPayload, requestWonList, cancelDeal } from "../../../app/reducers/user-slice";
import { RootState } from "../../../app/store";
import { ConfirmModal2 } from "../../../components/common/confirm-modal-2/confirm-modal-2";
import { apiRoute } from "../../../constants";
import { Product } from "../../../models";
import { formatPrice } from "../../../utils";
import "../selling-products/selling-products.module.css";
import { EvaluationModal } from "./evaluation-modal/evaluation-modal";

export const WonProducts = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.userState.wonProducts);
    const isLoading = useAppSelector((state: RootState) => state.userState.isLoadingWonProducts);
    const navigate = useNavigate();
    const [currentProduct, setCurrentProduct] = useState(0);
    const [currentBidder, setCurrentBidder] = useState(0);
    const [isCancelTransactionModalShown, setIsCancelTransactionModalShown] = useState(false);
    const [clickedProduct, setClickedProduct] = useState({} as Product);
    const [IsEvaluationModalShown, setIsEvaluationModalShown] = useState(false);

    const onCancelEvaluation = () => {
        setIsEvaluationModalShown(false);
    };

    const onShowEvalution = (product: Product) => {
        setClickedProduct(product);
        setIsEvaluationModalShown(true);
    };

    useEffect(() => {
        dispatch(requestWonList());
    }, []);

    const onItemClicked = (product: Product) => {
        navigate(`/${apiRoute.PRODUCT}/${product.id}`);
    };

    const handleOnProductClick = (productId: number = 0, bidderId: number = 0) => {
        setCurrentProduct(productId);
        setCurrentBidder(bidderId);
    };

    const onCloseModal = () => {
        setIsCancelTransactionModalShown(false);
    };

    const onCancelDeal = () => {
        console.log("Cancel deal");
        const payload: UserReviewPayload = {
            productId: currentProduct,
            userId: currentBidder,
        };
        // dispatch(cancelDeal(payload));
    };

    return (
        <div>
            {/* <Spinner animation="border" variant="primary" className="d-block mx-auto" /> */}
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
                                <th>Đánh giá</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products?.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.subCategory?.name}</td>
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
                                        <td>
                                            <Button variant="primary" onClick={() => onShowEvalution(product)}>
                                                Đánh giá
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="info" onClick={() => onItemClicked(product)}>
                                                Chi tiết
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
                show={isCancelTransactionModalShown}
                headingTitle="Xác nhận"
                bodyContent="Bạn có chắc muốn hủy giao dịch?"
                onConfirm={onCancelDeal}
                onCancel={onCloseModal}
            />
            <EvaluationModal
                show={IsEvaluationModalShown}
                onCancel={onCancelEvaluation}
                productId={clickedProduct?.id}
                userId={clickedProduct?.seller?.id}
            />
        </div>
    );
};
