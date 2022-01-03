import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { requestGetUserList } from "../../../app/reducers/user-slice";
import { Paginator } from "../../../components/common/paginator/paginator";
import { colors, pagingConstant } from "../../../constants";
import { User } from "../../../models";
import classes from "./users-list.module.css";

export const UsersList = () => {
    const { isLoadingUserList, users, loadedUserListCurrentPage, loadedUserListTotalPages } = useAppSelector(
        (state) => state.userState,
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestGetUserList(0));
    }, []);

    const onPaginationClick = (page: number) => {
        dispatch(requestGetUserList(page));
    };

    return (
        <div className={`${classes["text"]}`}>
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
                                        <Icon icon="bx:bxs-edit" style={{ color: colors.primary, fontSize: 24 }} />
                                        <Icon
                                            icon="fluent:delete-24-regular"
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
        </div>
    );
};
