import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import { Button, Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { useAppSelector } from "../../../app/hook";
import { colors } from "../../../constants";
import classes from "./user-info.module.css";

export const UserInfo = () => {
    const { user } = useAppSelector((state) => state.userState);

    const [isEditName, setIsEditName] = useState(false);
    const [isEditEmail, setIsEditEmail] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [isSavable, setIsSavable] = useState(false);

    return (
        <div>
            <Row>
                <Col sm={4}>
                    <Image src={user.avatar} width="100%" className={`rounded-circle ${classes["avatar"]}`} />
                </Col>
                <Col className="d-flex flex-column justify-content-between my-5">
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
                    </div>

                    <div className="align-self-end">
                        <Button
                            disabled={!isSavable}
                            style={{ backgroundColor: colors.primary }}
                            className={`mx-1 ${classes["text"]}`}
                            onClick={() => {
                                setIsSavable(false);
                                setIsEditName(false);
                                setIsEditEmail(false);
                            }}
                        >
                            Lưu Thay Đổi
                        </Button>

                        <Button style={{ backgroundColor: colors.primary }} className={`mx-1 ${classes["text"]}`}>
                            Đổi Mật Khẩu
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
