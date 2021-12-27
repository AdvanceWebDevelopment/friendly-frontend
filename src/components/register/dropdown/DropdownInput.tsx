import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./DropdownInput.module.css";
import DropdownOption from "./DropdownOption";
export interface DropdownInputFieldProps {
    options: string[];
    receiveValue: (val: string) => void;
}

export default function DropdownInputField({ options, receiveValue }: DropdownInputFieldProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [currentVal, setCurrentVal] = React.useState(options[0]);

    const close = () => {
        setIsDropdownOpen(false);
    };

    const changeCurrentVal = (val: string) => {
        setCurrentVal(val);
        receiveValue(val);
        close();
    };

    React.useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (isDropdownOpen && ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className={classes["input"]} ref={ref}>
            <button
                type="button"
                className={classes["btn-dropdown"]}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
                <div className={classes["current-val"]}>{currentVal}</div>
                <Icon icon="ls:dropdown" className={classes.icon} />
            </button>
            {isDropdownOpen && <DropdownOption options={options} updateVal={changeCurrentVal} />}
        </div>
    );
}
