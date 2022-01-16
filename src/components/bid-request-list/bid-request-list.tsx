import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { productActions } from "../../app/reducers/product-slice";
import { pagingConstant } from "../../constants";
import { BidRequest, Product } from "../../models";
import { Paginator } from "../common/paginator/paginator";
import classes from "./bid-request-list.module.css";

interface BidRequestListProps {
    product: Product;
    bidRequests: BidRequest[];
    currentPage: number;
    totalPages: number;
}

export const BidRequestList = ({ bidRequests, currentPage, totalPages, product }: BidRequestListProps) => {
    const dispatch = useAppDispatch();

    const onPaginationClick = (page: number) => {
        dispatch(
            productActions.requestGetBidRequestList({
                product: product,
                page: page,
            }),
        );
    };

    return (
        <div className={`${classes["text"]} ${classes["wrapper"]} p-3`}>
            <h3>Danh Sách Yêu Cầu Ra Giá</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Họ Tên</th>
                        <th>Email</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>

                <tbody>
                    {bidRequests.map((bidRequest, index) => {
                        return (
                            <tr key={index}>
                                <td>{pagingConstant.PAGE_SIZE * (currentPage - 1) + index + 1}</td>
                                <td>{bidRequest.bidder?.name}</td>
                                <td>{bidRequest.bidder?.email}</td>
                                <td></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <div className="mt-5 mb-3">
                <Paginator
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onItemSelected={onPaginationClick}
                    onNextClicked={onPaginationClick}
                    onPrevClicked={onPaginationClick}
                />
            </div>
        </div>
    );
};
