import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../../../app/hook";
import { ReviewPayload, userActions } from "../../../../app/reducers/user-slice";
import classes from "./evaluation-modal.module.css";
interface EvaluationModalProps {
    userId: number | undefined;
    productId: number | undefined;
    onCancel: () => void;
    show?: boolean;
}
export const EvaluationModal = ({ userId, productId, onCancel, show }: EvaluationModalProps) => {
    const [evaluation, setEvaluation] = useState("");
    const [like, setLike] = useState(false);

    const dispatch = useAppDispatch();
    const onConfirm = () => {
        let user: number = userId === undefined ? 0 : userId;
        let product: number = productId === undefined ? 0 : productId;

        const reviewPayload: ReviewPayload = {
            reviewInfo: {
                comment: evaluation,
                like,
            },
            productInfo: {
                productId: product,
                userId: user,
            },
        };

        dispatch(userActions.sendReviewToSeller(reviewPayload));
        setEvaluation("");
        onCancel();
    };

    const onEvaluationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEvaluation(e.target.value);
    };

    const onSetLike = (status: boolean) => {
        setLike(status);
    };

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton onHide={onCancel}>
                <Modal.Title id="contained-modal-title-vcenter">Nhận xét</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={classes["like-container"]}>
                    <div className={classes.options}>
                        <Icon
                            icon={like ? "heroicons-solid:thumb-up" : "heroicons-outline:thumb-up"}
                            className={like ? classes.like : classes.dislike}
                            onClick={() => onSetLike(true)}
                            width={30}
                            height={30}
                        />
                    </div>
                    <div className={classes.options}>
                        <Icon
                            icon={like ? "heroicons-outline:thumb-down" : "heroicons-solid:thumb-down"}
                            className={like ? classes.dislike : classes.like}
                            onClick={() => onSetLike(false)}
                            width={30}
                            height={30}
                        />
                    </div>
                </div>
                <label>Gửi nhận xét</label>
                <textarea className={classes["text-area"]} value={evaluation} onChange={onEvaluationChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Gửi Nhận Xét
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
