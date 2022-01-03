import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { RootState } from "../../../app/store";
import { requestListUpgrade, upgrade } from "../../../app/reducers/user-slice";
import { Button, Spinner, Table } from "react-bootstrap";
import { pagingConstant } from "../../../constants";
import { Paginator } from "../../../components/common/paginator/paginator";
import { ConfirmModal2 } from "../../../components/common/confirm-modal-2/confirm-modal-2";
export const UpgradeRequests = () => {
    const {
        isLoadingListRequestUpgrade,
        loadedListReqUpgrade,
        loadedListReqUpgradeCurrentPage,
        loadedListReqUpgradeTotalPages,
    } = useAppSelector((state: RootState) => state.userState);

    const [isModalShown, setIsModalShown] = useState(false);

    const [currentUserId, setCurrentUserId] = useState(0);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestListUpgrade(0));
    }, []);

    const onPaginationClick = (page: number) => {
        dispatch(requestListUpgrade(page));
    };

    const downgradeUser = () => {
        console.log(currentUserId);
        dispatch(upgrade(currentUserId.toString()));
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
            {isLoadingListRequestUpgrade && (
                <Spinner animation="border" variant="primary" className="d-block mx-auto" />
            )}
            {!isLoadingListRequestUpgrade && (
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>DoB</th>
                                <th>Điểm</th>
                                <th>Thăng cấp</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loadedListReqUpgrade?.map((requests, index) => {
                                return (
                                    <>
                                        <tr key={index} className="align-items-end">
                                            <td>
                                                {pagingConstant.PAGE_SIZE * (loadedListReqUpgradeCurrentPage - 1) +
                                                    index +
                                                    1}
                                            </td>
                                            <td>{requests.name}</td>
                                            <td>{requests.email}</td>
                                            <td>{requests.dob?.toLocaleDateString("en-AU")}</td>
                                            <td>{requests.points}</td>
                                            <td>
                                                <Button
                                                    type="button"
                                                    variant="success"
                                                    onClick={(e) => onDowngradeClick(requests.id ?? 0)}
                                                >
                                                    Thăng cấp
                                                </Button>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
            <div className="mt-5 mb-3">
                <Paginator
                    currentPage={loadedListReqUpgradeCurrentPage}
                    totalPages={loadedListReqUpgradeTotalPages}
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
