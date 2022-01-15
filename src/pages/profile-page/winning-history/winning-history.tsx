import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { requestWinningHistory } from "../../../app/reducers/user-slice";
import { RootState } from "../../../app/store";
import { apiRoute } from "../../../constants";
import { Product } from "../../../models";
import { formatPrice } from "../../../utils";
import { EvaluationModal } from "./evaluation-modal/evaluation-modal";

export const WinningHistory = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.userState.loadedWinningHistory);
    const isLoading = useAppSelector((state: RootState) => state.userState.isLoadingWonProducts);
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
        dispatch(requestWinningHistory(0));
    }, []);

    const navigate = useNavigate();

    const onItemClicked = (product: Product) => {
        navigate(`/${apiRoute.PRODUCT}/${product.id}`);
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
                                <th>Ngày thắng</th>
                                <th>Nhận xét</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products?.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category?.name}</td>
                                        <td>{formatPrice(product.currentPrice ?? 0)}</td>
                                        <td>{product.endDate?.toLocaleDateString("en-AU")}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => onShowEvalution(product)}>
                                                Nhận xét
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
            <EvaluationModal
                show={IsEvaluationModalShown}
                onCancel={onCancelEvaluation}
                productId={clickedProduct?.id}
                userId={clickedProduct?.seller?.id}
            />
        </div>
    );
};
