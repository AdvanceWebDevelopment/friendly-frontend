import { Icon } from "@iconify/react";
import * as React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { getCategories } from "../../../app/reducers/category-slice";
import { SubCategory } from "../../../models";
import classes from "./CategoryFilterButton.module.css";
import CategoryFilterDropdown from "./dropdown/CategoryFilterDropdown";

interface CategoryFilterButtonProps {
    onSubcategoryChange?: (subCategory: SubCategory) => void;
}

export default function CategoryFilterButton({ onSubcategoryChange }: CategoryFilterButtonProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dispatch = useAppDispatch();
    React.useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories());
        }
    }, []);

    const { selectedCategoryId, categories } = useAppSelector((state) => state.categoryState);
    const currentCategory = categories.filter((category) => category.id === selectedCategoryId)[0];
    const [subCategory, setSubCategory] = useState<SubCategory>();

    return (
        <div className={`${classes["category-filter-container"]}`}>
            <button
                role="button"
                className={`${classes["btn-filter"]}`}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
                <Icon icon="bx:bx-category-alt" className={classes["icon-filter"]} />
                <span>{subCategory?.name ?? "Chọn"}</span>
            </button>
            {isDropdownOpen && (
                <CategoryFilterDropdown
                    category={currentCategory}
                    onChange={(subCate) => {
                        setSubCategory(subCate);

                        if (onSubcategoryChange) {
                            onSubcategoryChange(subCate);
                        }
                    }}
                />
            )}
        </div>
    );
}
