import * as React from "react";
import { classicNameResolver } from "typescript";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getCategories, selectCategories } from "../../app/reducers/category-slice";
import { Category, SubCategory } from "../../models";
import classes from "./SearchBarDropdown.module.css";

export interface SearchBarDropdownProps {
    changeFilterHandler: (category: string, categoryId?: number, subCategoryId?: number) => void;
}

export default function SearchBarDropdown({ changeFilterHandler }: SearchBarDropdownProps) {
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories());
        }
    }, []);

    const updateFilter = React.useCallback(
        (category: string, categoryId?: number, subCategoryId?: number) => {
            console.log(category, categoryId, subCategoryId);
            changeFilterHandler(category, categoryId, subCategoryId);
        },
        [changeFilterHandler],
    );

    const renderCategories = React.useCallback(() => {
        return categories?.map((category: Category) => {
            return (
                <li className={classes["dropdown-item"]} key={category.id}>
                    <div onClick={() => updateFilter(category.name ?? "", category.id)}>{category.name}</div>
                    <ul className={classes["sub-dropdown"]}>{renderSubcategories(category)}</ul>
                </li>
            );
        });
    }, []);
    const renderSubcategories = React.useCallback((category: Category) => {
        return category.subCategories?.map((subCategory: SubCategory) => {
            return (
                <li className={classes["sub-dropdown-item"]} key={subCategory.id}>
                    <div onClick={() => updateFilter(subCategory.name ?? "", category.id, subCategory.id)}>
                        {subCategory.name}
                    </div>
                </li>
            );
        });
    }, []);

    return (
        <div>
            <ul className={classes.dropdown}>{renderCategories()}</ul>
        </div>
    );
}
