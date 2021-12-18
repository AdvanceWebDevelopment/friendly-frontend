import React, { CSSProperties, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { colors } from "../../constants/colors";
import { Category } from "../../models/category";
import { categoryService } from "../../services/category-service";
import { DoranCarousel } from "./doran-carousel";
import { useNavigate, useParams } from "react-router-dom";
import { apiRoute } from "../../constants/api-routes";

export interface CategoryCarouselProps {
    style?: CSSProperties;
    className?: string;
}

export const CategoryCarousel = (props: CategoryCarouselProps) => {
    const { style, className } = props;

    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Delay demo
        setTimeout(() => {
            setCategories(categoryService.getCategories());
            setIsLoaded(true);
        }, 1500);
    }, [categories]);

    return (
        <div style={style}>
            {/* This is a placeholder. It keeps spacec for content */}
            {!isLoaded && <div style={{ height: "12rem" }}></div>}

            {isLoaded && (
                <DoranCarousel className={className} itemToShow={6}>
                    {categories.map((category, index) => {
                        return (
                            <div
                                key={index}
                                className="d-inline-block align-middle shadow p-3 mb-5"
                                style={{
                                    background: colors.subPrimary,
                                    width: "10rem",
                                    height: "12rem",
                                    borderRadius: "15%",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate(`${apiRoute.CATEGORY}/${category.id}`)}
                            >
                                <div className="text-center mb-2">
                                    <Icon fontSize={120} color={colors.primary} icon={category.getIconByName()} />
                                </div>

                                <div
                                    className="text-center text-uppercase fw-bold text-wrap"
                                    style={{ fontSize: 16, fontFamily: "Montserrat", color: colors.primary }}
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
