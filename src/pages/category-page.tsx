import React from "react";
import { useParams } from "react-router-dom";

export const CategoryPage = () => {
    const params = useParams();
    return <h1>Category {params["id"]}</h1>;
};
