import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
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

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [password, setPassword] = useState(user?.password);
    const [startDate, setStartDate] = useState(user?.dob);

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setPassword(user?.password);
        setStartDate(user?.dob);
    }, [user]);

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        setValidated(true);

        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true && onConfirm) {
            onConfirm({
                ...user,
                name,
                email,
                password,
                dob: startDate,
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
                        <Form.Label>Họ Tên *</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Họ Tên"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Không được bỏ trống họ tên</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            as={"input"}
                            required
                            type="email"
                            placeholder="Email"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Email không hợp lệ</Form.Control.Feedback>
                    </Form.Group>

                    {user?.id && (
                        <div className={``}>
                            <Form.Label>Ngày Sinh</Form.Label>

                            <div>
                                <DatePicker
                                    selected={startDate ?? new Date()}
                                    onChange={(date: Date) => {
                                        if (date) {
                                            setStartDate(date);
                                        }
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className={`px-3 w-100`}
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={60}
                                />
                            </div>
                        </div>
                    )}

                    {!user?.id && (
                        <Form.Group>
                            <Form.Label>Mật Khẩu</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Mật Khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">Không được bỏ trống mật khẩu</Form.Control.Feedback>
                        </Form.Group>
                    )}
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
