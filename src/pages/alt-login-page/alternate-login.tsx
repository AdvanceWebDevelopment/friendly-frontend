import React from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";

export const AlternateLoginPage = () => {
    let { accessToken, refreshToken } = useParams();
    console.log(accessToken);
    return <Spinner animation="border" variant="primary" className="d-block mx-auto center my-auto" />;
};
