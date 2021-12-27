import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { apiRoute, colors } from "../../constants";
import classes from "./profile-page.module.css";

export const ProfilePage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Default route
        navigate(`/${apiRoute.PROFILE}/user-info`);
    }, []);

    const items = [
        { name: "Thông Tin Cá Nhân", value: "user-info" },
        { name: "Điểm Và Đánh Giá", value: "user-points" },
        { name: "Sản Phẩm Yêu Thích", value: "favorite-products" },
        { name: "Đang Đấu Giá", value: "bidding-products" },
        { name: "Lịch Sử Thắng Giá", value: "winning-history" },
        { name: "Sản Phẩm Đăng Bán", value: "selling-products" },
        { name: "Sản Phẩm Hết Hạn", value: "expired-products" },
        { name: "Danh Sách Người Dùng", value: "users-list" },
        { name: "Yêu Cầu Nâng Cấp", value: "upgrade-requests" },
    ];

    const location = useLocation();

    return (
        <div className={`${classes["page-wrapper"]}`}>
            <Container className={`${classes["page-content"]}`}>
                <Row>
                    <Col sm={3}>
                        <div className={`${classes["item-list"]}`}>
                            <ListGroup as="ul">
                                {items.map((item, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={`/${apiRoute.PROFILE}/${item.value}`}
                                            className={`${classes["item-link"]}`}
                                        >
                                            <ListGroupItem
                                                as="li"
                                                className={`${classes["item"]}`}
                                                active={location.pathname.includes(item.value)}
                                                style={{
                                                    backgroundColor: location.pathname.includes(item.value)
                                                        ? colors.primary
                                                        : "",
                                                }}
                                            >
                                                {item.name}
                                            </ListGroupItem>
                                        </Link>
                                    );
                                })}
                            </ListGroup>
                        </div>
                    </Col>
                    <Col className={`${classes["item-content"]}`}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
