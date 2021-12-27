import * as React from "react";
import classes from "./DropdownOption.module.css";

export interface DropdownOptionProps {
    options: string[];
    updateVal: (val: string) => void;
}

export default function DropdownOption({ options, updateVal }: DropdownOptionProps) {
    const renderItem = React.useCallback(() => {
        return options.map((option) => {
            return (
                <li className={classes["dropdown-item"]} key={options.indexOf(option)}>
                    <div onClick={() => updateVal(option)}>{option}</div>
                </li>
            );
        });
    }, []);

    return <ul className={classes.dropdown}>{renderItem()}</ul>;
}
