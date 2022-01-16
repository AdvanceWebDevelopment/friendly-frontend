import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { useAppDispatch } from "../../app/hook";
import { productActions } from "../../app/reducers/product-slice";
import { colors, pagingConstant } from "../../constants";
import { BidRequest, Product } from "../../models";
import { ConfirmModal } from "../common/confirm-modal/confirm-modal";
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

    const [showApproveConfirmModal, setShowApproveConfirmModal] = useState(false);
    const [showRejectConfirmModal, setShowRejectConfirmModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<BidRequest>();

    const onApprove = (bidRequest: BidRequest) => {
        setSelectedRequest(bidRequest);
        setShowApproveConfirmModal(true);
    };

    const onConfirmApproval = () => {
        closeApproveConfirmModal();

        if (selectedRequest) {
            dispatch(productActions.requestApproveBidRequest(selectedRequest));
        }
    };

    const closeApproveConfirmModal = () => {
        setSelectedRequest(undefined);
        setShowApproveConfirmModal(false);
    };

    const onReject = (bidRequest: BidRequest) => {
        setSelectedRequest(bidRequest);
        setShowRejectConfirmModal(true);
    };

    const onConfirmRejection = () => {
        closeRejectConfirmModal();

        if (selectedRequest) {
            dispatch(productActions.requestRejectBidRequest(selectedRequest));
        }
    };

    const closeRejectConfirmModal = () => {
        setSelectedRequest(undefined);
        setShowRejectConfirmModal(false);
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
                            <tr key={index} className={classes["row"]}>
                                <td>{pagingConstant.PAGE_SIZE * (currentPage - 1) + index + 1}</td>
                                <td>{bidRequest.bidder?.name}</td>
                                <td>{bidRequest.bidder?.email}</td>
                                <td>
                                    <OverlayTrigger overlay={<Tooltip>Chấp Nhận</Tooltip>}>
                                        <Button
                                            style={{ backgroundColor: colors.green, borderColor: colors.green }}
                                            className="mx-1"
                                            onClick={() => onApprove(bidRequest)}
                                        >
                                            <Icon icon="subway:tick" />
                                        </Button>
                                    </OverlayTrigger>

                                    <OverlayTrigger overlay={<Tooltip>Từ Chối</Tooltip>}>
                                        <Button
                                            style={{ backgroundColor: colors.red, borderColor: colors.red }}
                                            className="mx-1"
                                            onClick={() => onReject(bidRequest)}
                                        >
                                            <Icon icon="bi:x-lg" />
                                        </Button>
                                    </OverlayTrigger>
                                </td>
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

            <ConfirmModal
                headingTitle="Xác nhận"
                bodyContent="Cho phép người dùng này ra giá?"
                show={showApproveConfirmModal}
                onComfirm={onConfirmApproval}
                onCancel={closeApproveConfirmModal}
            />

            <ConfirmModal
                headingTitle="Xác nhận"
                bodyContent="Từ chối cho phép người dùng này ra giá?"
                show={showRejectConfirmModal}
                onComfirm={onConfirmRejection}
                onCancel={closeRejectConfirmModal}
            />
        </div>
    );
};
