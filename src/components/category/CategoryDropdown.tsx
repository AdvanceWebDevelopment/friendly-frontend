import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { requestGetCategories, selectCategories } from "../../app/reducers/category-slice";
import { apiRoute } from "../../constants";
import { Category, SubCategory } from "../../models";
import classes from "./CategoryDropdown.module.css";

export interface CategoryDropdownProps {
    visibility: boolean;
    onMouseEventHandler: (state: boolean) => void;
}

export default function CategoryDropdown(props: CategoryDropdownProps) {
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        dispatch(requestGetCategories());
    }, []);

    const handleOnMouseEvent = (state: boolean) => {
        props.onMouseEventHandler(state);
    };

    const onCategoryClick = (category: Category) => {
        navigate(`/${apiRoute.CATEGORY}/${category.id}`, {
            state: {
                categoryId: category.id,
                page: 0,
            },
        });
    };

    const onSubCategoryClick = (category: Category, subCategory: SubCategory) => {
        navigate(`/${apiRoute.CATEGORY}/${category.id}`, {
            state: {
                categoryId: category.id,
                subCategoryId: subCategory.id,
                page: 0,
            },
        });
    };

    const renderCategories = React.useCallback(() => {
        return categories?.map((category: Category) => {
            return (
                <li
                    className={classes["dropdown-item"]}
                    key={category.id}
                    onClick={(e) => {
                        onCategoryClick(category);
                    }}
                >
                    {category.name}
                    <ul className={classes["sub-dropdown"]}>{renderSubcategories(category)}</ul>
                </li>
            );
        });
    }, [categories]);

    const renderSubcategories = React.useCallback(
        (category: Category) => {
            return category.subCategories?.map((subCategory: SubCategory) => {
                return (
                    <li
                        className={classes["sub-dropdown-item"]}
                        key={subCategory.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSubCategoryClick(category, subCategory);
                        }}
                    >
                        {subCategory.name}
                    </li>
                );
            });
        },
        [categories],
    );

    return (
        <ul
            className={classes.dropdown}
            style={{ display: `${props.visibility ? "block" : "none"}` }}
            onMouseEnter={() => handleOnMouseEvent(true)}
            onMouseLeave={() => handleOnMouseEvent(false)}
        >
            {renderCategories()}
        </ul>
    );
}
