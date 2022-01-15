import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { requestEvaluations } from "../../../app/reducers/user-slice";
import { RootState } from "../../../app/store";
import { pagingConstant } from "../../../constants";

export const EvaluationsAndPoints = () => {
    const { isLoadingEvaluations, loadedEvaluations, loadedEvaluationsCurrentPage, loadedEvaluationsTotalPages } =
        useAppSelector((state: RootState) => state.userState);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestEvaluations(0));
    }, []);

    return (
        <div>
            {isLoadingEvaluations && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoadingEvaluations && (
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Người đánh giá</th>
                                <th>Sản phẩm</th>
                                <th>Nội dung</th>
                                <th>Ngày đánh giá</th>
                                <th>Điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadedEvaluations?.map((evaluation, index) => {
                                return (
                                    <tr key={index} className="align-items-end">
                                        <td>
                                            {pagingConstant.PAGE_SIZE * (loadedEvaluationsCurrentPage - 1) + index + 1}
                                        </td>
                                        <td>{evaluation.assessor?.email}</td>
                                        <td>{evaluation.product?.name}</td>
                                        <td>{evaluation.comment}</td>
                                        <td>{evaluation.createAt?.toLocaleDateString("en-AU")}</td>
                                        <td>{evaluation.isLike}</td>
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
