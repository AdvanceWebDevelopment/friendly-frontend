import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
    requestAdminUpdateUser,
    requestCreateUser,
    requestDeleteUser,
    requestGetUserList,
} from "../../../app/reducers/user-slice";
import { ConfirmModal } from "../../../components/common/confirm-modal/confirm-modal";
import { Paginator } from "../../../components/common/paginator/paginator";
import { colors, pagingConstant } from "../../../constants";
import { User } from "../../../models";
import { CreateUserModal } from "./components/create-user-modal";
import classes from "./users-list.module.css";

export const UsersList = () => {
    const { isLoadingUserList, users, loadedUserListCurrentPage, loadedUserListTotalPages, isCreatingUser } =
        useAppSelector((state) => state.userState);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestGetUserList(0));
    }, []);

    const onPaginationClick = (page: number) => {
        dispatch(requestGetUserList(page));
    };

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [tobeDeleteUser, setTobeDeleteUser] = useState<User>();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const onCreateUser = () => {
        setShowModal(true);
    };

    const onUpdateUser = (user: User) => {
        setShowModal(true);
        setSelectedUser(user);
    };

    const onSubmit = (user: User) => {
        if (!user.id) {
            dispatch(requestCreateUser(user));
        } else {
            dispatch(requestAdminUpdateUser(user));
        }

        closeCreateUserModal();
    };

    const onCancelCreateUser = () => {
        closeCreateUserModal();
    };

    const closeCreateUserModal = () => {
        setShowModal(false);
        setSelectedUser(undefined);
    };

    const onDeleteUser = (user: User) => {
        setShowConfirmModal(true);
        setTobeDeleteUser(user);
    };

    const onConfirmDelete = () => {
        if (tobeDeleteUser) {
            dispatch(requestDeleteUser(tobeDeleteUser));
        }

        onCancelDelete();
    };

    const onCancelDelete = () => {
        setShowConfirmModal(false);
        setTobeDeleteUser(undefined);
    };

    return (
        <div className={`${classes["text"]}`}>
            <div className="d-flex justify-content-end align-items-center mb-3">
                <ButtonGroup>
                    <Button style={{ backgroundColor: colors.primary }} onClick={onCreateUser}>
                        Tạo 1 Tài Khoản
                    </Button>
                </ButtonGroup>
            </div>

            {isLoadingUserList && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoadingUserList && (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th></th>

                            <th>Họ Tên</th>

                            <th>Email</th>

                            <th>Phân Hệ</th>

                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{pagingConstant.PAGE_SIZE * (loadedUserListCurrentPage - 1) + index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{User.roleNameOf(user.role)}</td>
                                    <td className="d-flex justify-content-around">
                                        <Icon
                                            icon="bx:bxs-edit"
                                            style={{ color: colors.primary, fontSize: 24 }}
                                            onClick={() => onUpdateUser(user)}
                                        />
                                        <Icon
                                            icon="fluent:delete-24-regular"
                                            onClick={() => onDeleteUser(user)}
                                            style={{ color: colors.red, fontSize: 24 }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}

            <div className="mt-5 mb-3">
                <Paginator
                    currentPage={loadedUserListCurrentPage}
                    totalPages={loadedUserListTotalPages}
                    onItemSelected={onPaginationClick}
                    onNextClicked={onPaginationClick}
                    onPrevClicked={onPaginationClick}
                />
            </div>

            <CreateUserModal
                headingTitle="Quản Lý Người Dùng"
                show={showModal}
                onCancel={onCancelCreateUser}
                onConfirm={onSubmit}
                user={selectedUser}
            />

            <ConfirmModal
                show={showConfirmModal}
                headingTitle="Xác Nhận"
                bodyContent="Bạn Chắc Chứ?"
                onCancel={onCancelDelete}
                onComfirm={onConfirmDelete}
            />
        </div>
    );
};
