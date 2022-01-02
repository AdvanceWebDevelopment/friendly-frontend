import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import { colors } from "../../../constants";
import classes from "./confirm-modal.module.css";

interface ConfirmModalProps {
    headingTitle?: string;
    bodyContent?: string;
    onComfirm?: () => void;
    onCancel?: () => void;

    show?: boolean;
}

export const ConfirmModal = ({ headingTitle, bodyContent, onComfirm, onCancel, show }: ConfirmModalProps) => {
    return (
        <Modal show={show} centered className={classes["text"]}>
            <Modal.Header closeButton onHide={onCancel}>
                <Modal.Title>{headingTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{bodyContent}</Modal.Body>

            <Modal.Footer>
                <Button onClick={onComfirm} style={{ backgroundColor: colors.primary }}>
                    Xác Nhận
                </Button>
                <Button
                    onClick={onCancel}
                    style={{
                        backgroundColor: colors.subPrimary,
                        color: colors.primary,
                        borderColor: colors.primary,
                    }}
                >
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
