import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { requestGetCategories } from "../../../../app/reducers/category-slice";
import { Category, SubCategory } from "../../../../models";
import classes from "./CategoryFilterDropdown.module.css";
export interface CategoryFilterDropdownProps {
    category?: Category;
    onChange?: (subCategory: SubCategory) => void;
}

export default function CategoryFilterDropdown({ category, onChange }: CategoryFilterDropdownProps) {
    const renderCategories = () => {
        return category?.subCategories?.map((subCate: SubCategory) => {
            return (
                <div className={classes.option} key={subCate.id}>
                    <input
                        type="radio"
                        id="category"
                        name="category"
                        className={classes.input}
                        onChange={(e) => {
                            if (onChange) {
                                onChange(subCate);
                            }
                        }}
                        value={subCate.id}
                    />
                    <label htmlFor={subCate.name} className={classes.label}>
                        {subCate.name}
                    </label>
                </div>
            );
        });
    };
    return <div className={classes.dropdown}>{renderCategories()}</div>;
}
