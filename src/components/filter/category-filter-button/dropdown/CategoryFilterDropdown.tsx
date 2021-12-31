import * as React from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { getCategories, selectCategories } from "../../../../app/reducers/category-slice";
import { Category, SubCategory } from "../../../../models";
import { FilteredCategory } from "../CategoryFilterButton";
import classes from "./CategoryFilterDropdown.module.css";
export interface CategoryFilterDropdownProps {
    getFilterCategory: (cat: FilteredCategory) => void;
}

export default function CategoryFilterDropdown({ getFilterCategory }: CategoryFilterDropdownProps) {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);

    React.useEffect(() => {
        dispatch(getCategories());
    }, []);

    const renderCategories = () => {
        return categories.map((cat: Category) => {
            return (
                <div className={classes.option} key={cat.id}>
                    <input
                        type="radio"
                        id="category"
                        name="category"
                        className={classes.input}
                        onChange={(e) => getFilterCategory({ id: cat.id, name: cat.name } as FilteredCategory)}
                        value={cat.id}
                        defaultChecked={cat.id === 1 ? true : false}
                    />
                    <label htmlFor={cat.name} className={classes.label}>
                        {cat.name}
                    </label>
                </div>
            );
        });
    };
    return <div className={classes.dropdown}>{renderCategories()}</div>;
}
