import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { colors } from "../../../../constants";
import { User } from "../../../../models";

interface CreateUserModalProps {
    show?: boolean;
    user?: User;
    headingTitle?: string;
    onConfirm?: (user: User) => void;
    onCancel?: () => void;
}

export const CreateUserModal = ({ show, user, headingTitle, onConfirm, onCancel }: CreateUserModalProps) => {
    const [validated, setValidated] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        setValidated(true);

        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true && onConfirm) {
            onConfirm({
                name,
                email,
                password,
            });
        }
    };

    return (
        <Modal show={show} centered>
            <Modal.Header closeButton onHide={onCancel}>
                <Modal.Title>{headingTitle}</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Họ Tên</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Họ Tên"
                            defaultValue={user?.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Không được bỏ trống họ tên</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            as={"input"}
                            required
                            type="email"
                            placeholder="Email"
                            defaultValue={user?.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Email không hợp lệ</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mật Khẩu</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Mật Khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Không được bỏ trống mật khẩu</Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" style={{ backgroundColor: colors.primary }}>
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
            </Form>
        </Modal>
    );
};
