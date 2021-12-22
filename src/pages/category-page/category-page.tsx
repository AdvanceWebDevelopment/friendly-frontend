import React from "react";
import { useParams } from "react-router-dom";
import { Paginator } from "../../components/common/paginator/paginator";
import { CategoryCarousel } from "../../components/doran-carousel/category-carousel";
import FilterSection from "../../components/filter/FilterSection";
export const CategoryPage = () => {
    const params = useParams();
    return (
        <div>
            <CategoryCarousel className="container" style={{ marginTop: "-6rem" }} />
            <FilterSection />
            <div className="d-flex justify-content-center mb-5">Category {params["id"]}</div>
            <div>
                <Paginator currentPage={1} totalPages={10} />
            </div>
        </div>
    );
};
