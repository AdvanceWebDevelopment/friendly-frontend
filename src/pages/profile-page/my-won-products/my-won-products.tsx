import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { requestMyWonProducts } from "../../../app/reducers/user-slice";
import { RootState } from "../../../app/store";
import { apiRoute } from "../../../constants";
import { Product } from "../../../models";
import { formatPrice } from "../../../utils";

export const MyWonProducts = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state: RootState) => state.userState.loadedMyWonProducts);
    const isLoading = useAppSelector((state: RootState) => state.userState.isLoadingWonProducts);

    useEffect(() => {
        dispatch(requestMyWonProducts(0));
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
                                <th>Người thắng</th>
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
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};
