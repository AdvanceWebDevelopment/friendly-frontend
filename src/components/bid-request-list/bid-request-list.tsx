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
            <h3>Danh S??ch Y??u C???u Ra Gi??</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>H??? T??n</th>
                        <th>Email</th>
                        <th>H??nh ?????ng</th>
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
                                    <OverlayTrigger overlay={<Tooltip>Ch???p Nh???n</Tooltip>}>
                                        <Button
                                            style={{ backgroundColor: colors.green, borderColor: colors.green }}
                                            className="mx-1"
                                            onClick={() => onApprove(bidRequest)}
                                        >
                                            <Icon icon="subway:tick" />
                                        </Button>
                                    </OverlayTrigger>

                                    <OverlayTrigger overlay={<Tooltip>T??? Ch???i</Tooltip>}>
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
                headingTitle="X??c nh???n"
                bodyContent="Cho ph??p ng?????i d??ng n??y ra gi???"
                show={showApproveConfirmModal}
                onComfirm={onConfirmApproval}
                onCancel={closeApproveConfirmModal}
            />

            <ConfirmModal
                headingTitle="X??c nh???n"
                bodyContent="T??? ch???i cho ph??p ng?????i d??ng n??y ra gi???"
                show={showRejectConfirmModal}
                onComfirm={onConfirmRejection}
                onCancel={closeRejectConfirmModal}
            />
        </div>
    );
};
