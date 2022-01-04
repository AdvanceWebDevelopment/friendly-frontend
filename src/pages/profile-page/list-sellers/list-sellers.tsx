import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { RootState } from "../../../app/store";
import { requestListSeller, downgrade } from "../../../app/reducers/user-slice";
import { Button, Spinner, Table } from "react-bootstrap";
import { pagingConstant } from "../../../constants";
import { Paginator } from "../../../components/common/paginator/paginator";
import { ConfirmModal2 } from "../../../components/common/confirm-modal-2/confirm-modal-2";
export const ListSellers = () => {
    const { isLoadingSellers, loadedSellers, loadedSellersCurrentPage, loadedSellersTotalPages } = useAppSelector(
        (state: RootState) => state.userState,
    );

    const [isModalShown, setIsModalShown] = useState(false);

    const [currentUserId, setCurrentUserId] = useState(0);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestListSeller(0));
    }, []);

    const onPaginationClick = (page: number) => {
        dispatch(requestListSeller(page));
    };

    const downgradeUser = () => {
        dispatch(downgrade(currentUserId.toString()));
        setIsModalShown(false);
    };

    const onDowngradeClick = (userId: number) => {
        setCurrentUserId(userId);
        setIsModalShown(true);
    };

    const onCloseModal = () => {
        setIsModalShown(false);
    };

    return (
        <div>
            {isLoadingSellers && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoadingSellers && (
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>DoB</th>
                                <th>Điểm</th>
                                <th>Giáng cấp</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loadedSellers?.map((seller, index) => {
                                return (
                                    <tr key={index} className="align-items-end">
                                        <td>{pagingConstant.PAGE_SIZE * (loadedSellersCurrentPage - 1) + index + 1}</td>
                                        <td>{seller.name}</td>
                                        <td>{seller.email}</td>
                                        <td>{seller.dob?.toLocaleDateString("en-AU")}</td>
                                        <td>{seller.points}</td>
                                        <td>
                                            <Button
                                                type="button"
                                                variant="danger"
                                                onClick={(e) => onDowngradeClick(seller.id ?? 0)}
                                            >
                                                Giáng Cấp
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
            <div className="mt-5 mb-3">
                <Paginator
                    currentPage={loadedSellersCurrentPage}
                    totalPages={loadedSellersTotalPages}
                    onItemSelected={onPaginationClick}
                    onNextClicked={onPaginationClick}
                    onPrevClicked={onPaginationClick}
                />
            </div>
            <ConfirmModal2
                show={isModalShown}
                headingTitle="Xác Nhận"
                bodyContent="Bạn có chắc là muốn giáng chức người dùng này?"
                onConfirm={downgradeUser}
                onCancel={onCloseModal}
            />
        </div>
    );
};
