import { Icon } from "@iconify/react";
import React, { CSSProperties, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { requestGetCategories, setSelectedCategoryId } from "../../app/reducers/category-slice";
import { apiRoute } from "../../constants/api-routes";
import { colors } from "../../constants/colors";
import { Category } from "../../models";
import { DoranCarousel } from "./doran-carousel";

export interface CategoryCarouselProps {
    style?: CSSProperties;
    className?: string;
}

export const CategoryCarousel = (props: CategoryCarouselProps) => {
    const { style, className } = props;

    const navigate = useNavigate();

    const categoryState = useAppSelector((state) => state.categoryState);
    const { selectedCategoryId, categories, isLoadingCategories } = categoryState;

    const dispatch = useAppDispatch();
    const location = useLocation();

    if (!location.pathname.includes(apiRoute.CATEGORY)) {
        dispatch(setSelectedCategoryId(undefined));
    }

    useEffect(() => {
        dispatch(requestGetCategories());
    }, []);

    return (
        <div style={style}>
            {isLoadingCategories && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoadingCategories && (
                <DoranCarousel className={className} itemToShow={6}>
                    {categories.map((category, index) => {
                        return (
                            <div
                                key={index}
                                className="d-inline-block align-middle shadow p-3 mb-5"
                                style={{
                                    background: selectedCategoryId === category.id ? colors.primary : colors.subPrimary,
                                    width: "10rem",
                                    height: "12rem",
                                    borderRadius: "15%",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    dispatch(setSelectedCategoryId(category.id));
                                    navigate(`/${apiRoute.CATEGORY}/${category.id}`);
                                }}
                            >
                                <div className="text-center mb-2">
                                    <Icon
                                        fontSize={120}
                                        color={selectedCategoryId === category.id ? colors.subPrimary : colors.primary}
                                        icon={Category.getIconByName(category.name ?? "")}
                                    />
                                </div>

                                <div
                                    className="text-center text-uppercase fw-bold text-wrap"
                                    style={{
                                        fontSize: 16,
                                        fontFamily: "Montserrat",
                                        color: selectedCategoryId === category.id ? colors.subPrimary : colors.primary,
                                    }}
                                >
                                    {category.name}
                                </div>
                            </div>
                        );
                    })}
                </DoranCarousel>
            )}
        </div>
    );
};
