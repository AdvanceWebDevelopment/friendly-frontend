import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Icon } from "@iconify/react";
import classes from "./Footer.module.css";
export default function Footer() {
    return (
        <footer className={classes.footer}>
            <Container fluid className={classes.container}>
                <Row>
                    <Col xs={12} sm={6} lg={3}>
                        <span className={classes.heading}>DANH MỤC SẢN PHẨM</span>
                        <Row className={classes.products}>
                            <Col xs={12} lg={6}>
                                <Row>Tất Cả</Row>
                                <Row className="mt-4">Điện Tử</Row>
                                <Row className="mt-4">Nội Thất</Row>
                                <Row className="mt-4">Trang Sức</Row>
                                <Row className="mt-4">Tranh Vẽ</Row>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Row>Xe Cộ</Row>
                                <Row className="mt-4">Cổ Vật</Row>
                                <Row className="mt-4">Bất Động Sản</Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} sm={6} lg={{ span: 3, offset: 1 }}>
                        <span className={classes.heading}>GIỚI THIỆU</span>
                        <Row>
                            <Col xs={12} lg={12} sm={12} className={classes.intro}>
                                <div>Doran House</div>
                                <div className="mt-4">FAQ</div>
                                <div className="mt-4">Quảng Cáo</div>
                                <div className="mt-4">Tuyển Dụng</div>
                                <div className="mt-4">EULA</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} sm={12} lg={{ span: 3, offset: 1 }}>
                        <span className={classes.heading}>THEO DÕI CHÚNG TÔI</span>
                        <Row className={classes.contact}>
                            <Col xs={2} sm={2} lg={2}>
                                <Icon icon="bx:bx-phone-call" width={24} height={24} />
                            </Col>
                            <Col xs={10} sm={10} lg={10}>
                                <div>090 177 013</div>
                            </Col>
                        </Row>
                        <Row className={classes.contact}>
                            <Col xs={2} sm={2} lg={2}>
                                <Icon icon="ci:mail-open" width={24} height={24} />
                            </Col>
                            <Col xs={10} sm={10} lg={10}>
                                <div>18CLC6@hcmus.edu.vn</div>
                            </Col>
                        </Row>
                        <Row className={classes.contact}>
                            <Col xs={2} sm={2} lg={2}>
                                <Icon icon="carbon:location-filled" width={24} height={24} />
                            </Col>
                            <Col xs={10} sm={10} lg={10}>
                                <div>238 Nguyễn Văn Cừ, Q5, TP.HCM</div>
                            </Col>
                        </Row>
                        <Row className={classes.contact}>
                            <Col lg={6} xl={3} md={3} sm={3} className="mb-lg-4 mb-sm-3">
                                <Icon icon="cib:facebook" width={30} height={30} />
                            </Col>
                            <Col lg={6} xl={3} md={3} sm={3} className="mb-lg-4 mb-sm-3">
                                <Icon icon="cib:twitter" width={30} height={30} />
                            </Col>
                            <Col lg={6} xl={3} md={3} sm={3} className="mb-lg-4 mb-sm-3">
                                <Icon icon="cib:instagram" width={30} height={30} />
                            </Col>
                            <Col lg={6} xl={3} md={3} sm={3} className="mb-lg-4 mb-sm-3">
                                <Icon icon="cib:linkedin" width={30} height={30} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={classes.copyright}>
                    <div>
                        <Icon icon="emojione-monotone:copyright" width={30} height={30} />
                        <span className={classes.credit}>HCMUS Sorcerers</span>
                    </div>
                </Row>
            </Container>
        </footer>
    );
}
