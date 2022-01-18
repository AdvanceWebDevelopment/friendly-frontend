import React from "react";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router";

export const AlternateLoginPage = () => {
    const location = useLocation();
    console.log(location.search);
    return <Spinner animation="border" variant="primary" className="d-block mx-auto center my-auto" />;
};
