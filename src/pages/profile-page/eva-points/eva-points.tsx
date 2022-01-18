import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { requestEvaluations } from "../../../app/reducers/user-slice";
import { RootState } from "../../../app/store";
import { Paginator } from "../../../components/common/paginator/paginator";
import { pagingConstant } from "../../../constants";

export const EvaluationsAndPoints = () => {
    const { isLoadingEvaluations, loadedEvaluations, loadedEvaluationsCurrentPage, loadedEvaluationsTotalPages } =
        useAppSelector((state: RootState) => state.userState);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestEvaluations(0));
    }, []);

    const onPaginationClick = (page: number) => {
        dispatch(requestEvaluations(page));
    };

    console.log(loadedEvaluations);

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
                                        <td>{evaluation.assessor?.name ? evaluation.assessor?.name?.length : "N/A"}</td>
                                        <td>{evaluation.product?.name}</td>
                                        <td>{evaluation.comment}</td>
                                        <td>{evaluation.createAt?.toLocaleDateString("en-AU")}</td>
                                        <td>{evaluation.isLike ? 1 : 0}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
            <div className="mt-5 mb-3">
                <Paginator
                    currentPage={loadedEvaluationsCurrentPage}
                    totalPages={loadedEvaluationsTotalPages}
                    onItemSelected={onPaginationClick}
                    onNextClicked={onPaginationClick}
                    onPrevClicked={onPaginationClick}
                />
            </div>
        </div>
    );
};
