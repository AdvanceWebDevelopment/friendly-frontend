import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, FormControl, Image, InputGroup, Row, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { apiRoute, colors } from "../../../constants";
import { User } from "../../../models";
import DatePicker from "react-datepicker";
import classes from "./user-info.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { requestUpdateUser, requestUser } from "../../../app/reducers/user-slice";
import { useNavigate } from "react-router";

export const UserInfo = () => {
    const { user, isLoadingUser } = useAppSelector((state) => state.userState);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestUser());
    }, []);

    const [isEditName, setIsEditName] = useState(false);
    const [isEditEmail, setIsEditEmail] = useState(false);
    const [startDate, setStartDate] = useState(user.dob ?? new Date());

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [isSavable, setIsSavable] = useState(false);

    const navigate = useNavigate();

    const onUpdateUserInfo = () => {
        setIsSavable(false);
        setIsEditName(false);
        setIsEditEmail(false);

        dispatch(
            requestUpdateUser({
                ...user,
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                dob: startDate,
            }),
        );
    };

    return (
        <div>
            {isLoadingUser && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoadingUser && (
                <Row>
                    <Col sm={4}>
                        <Image src={user.avatar} width="80%" className={`rounded-circle ${classes["avatar"]}`} />
                    </Col>
                    <Col className="d-flex flex-column justify-content-between my-2">
                        <div>
                            <InputGroup className={`${classes["text"]} my-2`}>
                                <InputGroup.Text className={`${classes["label"]}`}>Họ Tên</InputGroup.Text>
                                <FormControl
                                    defaultValue={user.name}
                                    readOnly={!isEditName}
                                    style={{ backgroundColor: colors.subPrimary }}
                                    ref={nameRef}
                                />
                                <Button
                                    style={{ backgroundColor: colors.primary }}
                                    onClick={() => {
                                        setIsEditName(!isEditName);
                                        setIsSavable(true);
                                        nameRef.current?.focus();
                                    }}
                                >
                                    {!isEditName ? <Icon icon="ci:edit" /> : <Icon icon="el:ok-circle" />}
                                </Button>
                            </InputGroup>

                            <InputGroup className={`${classes["text"]} my-2`}>
                                <InputGroup.Text className={`${classes["label"]}`}>Email</InputGroup.Text>
                                <FormControl
                                    as="input"
                                    type="email"
                                    defaultValue={user.email}
                                    readOnly={!isEditEmail}
                                    style={{ backgroundColor: colors.subPrimary }}
                                    ref={emailRef}
                                />
                                <Button
                                    style={{ backgroundColor: colors.primary }}
                                    onClick={() => {
                                        setIsEditEmail(!isEditEmail);
                                        setIsSavable(true);
                                        emailRef.current?.focus();
                                    }}
                                >
                                    {!isEditEmail ? <Icon icon="ci:edit" /> : <Icon icon="el:ok-circle" />}
                                </Button>
                            </InputGroup>

                            <div className={`my-2 d-flex justify-content-between ${classes["text"]}`}>
                                <InputGroup>
                                    <InputGroup.Text className={`${classes["label"]}`}>Ngày Sinh</InputGroup.Text>
                                </InputGroup>

                                <div>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => {
                                            if (date) {
                                                setStartDate(date);
                                                setIsSavable(true);
                                            }
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        className={`px-3`}
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={60}
                                    />
                                </div>
                            </div>

                            <InputGroup className={`${classes["text"]} my-2`}>
                                <InputGroup.Text className={`${classes["label"]}`}>Điểm</InputGroup.Text>
                                <FormControl
                                    defaultValue={user.points}
                                    readOnly
                                    style={{ backgroundColor: colors.subPrimary }}
                                />
                            </InputGroup>

                            <InputGroup className={`${classes["text"]} my-2`}>
                                <InputGroup.Text className={`${classes["label"]}`}>Cấp Độ</InputGroup.Text>
                                <FormControl
                                    defaultValue={User.roleNameOf(user.role)}
                                    readOnly
                                    style={{ backgroundColor: colors.subPrimary }}
                                />
                            </InputGroup>
                        </div>

                        <div className="align-self-end mt-2">
                            <Button
                                disabled={!isSavable}
                                style={{ backgroundColor: colors.primary }}
                                className={`mx-1 ${classes["text"]}`}
                                onClick={onUpdateUserInfo}
                            >
                                Lưu Thay Đổi
                            </Button>

                            <Button
                                style={{ backgroundColor: colors.primary }}
                                className={`mx-1 ${classes["text"]}`}
                                onClick={() => navigate(`/${apiRoute.CHANGE}`)}
                            >
                                Đổi Mật Khẩu
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
};
