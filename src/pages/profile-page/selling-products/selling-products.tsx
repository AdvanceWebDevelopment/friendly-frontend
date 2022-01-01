import React from "react";
import { Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";
import { apiRoute, API_HOST } from "../../../constants";
import { Product } from "../../../models";
import { formatPrice } from "../../../utils";
import "./selling-products.module.css";

export const SellingProducts = () => {
    const { user, isLoadingUser } = useAppSelector((state) => state.userState);
    const navigate = useNavigate();

    const onItemClicked = (product: Product) => {
        navigate(`/${apiRoute.PRODUCT}/${product.id}`);
    };

    return (
        <div>
            {isLoadingUser && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoadingUser && (
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
                            {user.sellingProducts?.map((product, index) => {
                                return (
                                    <tr key={index} onClick={() => onItemClicked(product)}>
                                        <td>{index + 1}</td>
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
        </div>
    );
};
