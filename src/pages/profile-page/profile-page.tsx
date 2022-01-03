import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { apiRoute, colors } from "../../constants";
import { UserRole } from "../../models";
import classes from "./profile-page.module.css";

export const ProfilePage = () => {
    const items = [
        {
            name: "Thông Tin Cá Nhân",
            value: "user-info",
            role: UserRole.BIDDER,
        },
        {
            name: "Điểm Và Đánh Giá",
            value: "user-points",
            role: UserRole.BIDDER,
        },
        {
            name: "Sản Phẩm Yêu Thích",
            value: "favorite-products",
            role: UserRole.BIDDER,
        },
        {
            name: "Đang Đấu Giá",
            value: "bidding-products",
            role: UserRole.BIDDER,
        },
        {
            name: "Lịch Sử Thắng Giá",
            value: "winning-history",
            role: UserRole.BIDDER,
        },
        {
            name: "Sản Phẩm Đăng Bán",
            value: "selling-products",
            role: UserRole.SELLER,
        },
        {
            name: "Sản Phẩm Hết Hạn",
            value: "expired-products",
            role: UserRole.SELLER,
        },
        {
            name: "Quản Lý Danh Mục",
            value: "category-management",
            role: UserRole.ADMIN,
        },
        {
            name: "Danh Sách Người Dùng",
            value: "users-list",
            role: UserRole.ADMIN,
        },
        {
            name: "Yêu Cầu Nâng Cấp",
            value: "upgrade-requests",
            role: UserRole.ADMIN,
        },
        {
            name: "Danh Sách Người Bán",
            value: "list-sellers",
            role: UserRole.ADMIN,
        },
    ];

    const location = useLocation();

    const { user } = useAppSelector((state) => state.userState);

    return (
        <div className={`${classes["page-wrapper"]}`}>
            <Container className={`${classes["page-content"]}`}>
                <Row>
                    <Col sm={3}>
                        <div className={`${classes["item-list"]}`}>
                            <ListGroup as="ul">
                                {items.map((item, index) => {
                                    if (item.role === UserRole.SELLER && user.role !== item.role) {
                                        return;
                                    }

                                    if (item.role === UserRole.ADMIN && user.role !== item.role) {
                                        return;
                                    }

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
                    <Col className={`d-inline-block h-25 py-4 ${classes["item-content"]}`}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
