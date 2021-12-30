import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getCategories, selectCategories } from "../../app/reducers/category-slice";
import { Category, SubCategory } from "../../models";
import classes from "./CategoryDropdown.module.css";

export interface CategoryDropdownProps {
    visibility: boolean;
    onMouseEventHandler: (state: boolean) => void;
}

export default function CategoryDropdown(props: CategoryDropdownProps) {
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getCategories());
    }, []);

    const handleOnMouseEvent = (state: boolean) => {
        props.onMouseEventHandler(state);
    };
    const renderCategories = React.useCallback(() => {
        return categories?.map((category: Category) => {
            return (
                <li className={classes["dropdown-item"]} key={category.id}>
                    {category.name}
                    <ul className={classes["sub-dropdown"]}>{renderSubcategories(category.subCategories ?? [])}</ul>
                </li>
            );
        });
    }, [categories]);

    const renderSubcategories = React.useCallback(
        (subCategories: SubCategory[]) => {
            return subCategories.map((subCategory: SubCategory) => {
                return (
                    <li className={classes["sub-dropdown-item"]} key={subCategory.id}>
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
