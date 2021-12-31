import { Icon } from "@iconify/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { requestSearchProduct } from "../../app/reducers/category-slice";
import { apiRoute } from "../../constants";
import classes from "./SearchBar.module.css";
import SearchBarDropdown from "./SearchBarDropdown";

export default function SearchBar() {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [currentCategory, setCurrentCategory] = React.useState("Tất cả");
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<number>();
    const [selectedSubCategoryId, setSelectedSubCategoryId] = React.useState<number>();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const ref = React.useRef<HTMLDivElement>(null);

    const inputRef = React.useRef<HTMLInputElement>(null);

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

    const changeFilterHandler = (category: string, categoryId?: number, subCategoryId?: number) => {
        setCurrentCategory(category);

        setSelectedCategoryId(categoryId);
        setSelectedSubCategoryId(subCategoryId);
    };

    const onSearch = (keyword: string) => {
        if (keyword.length === 0) {
            return;
        }

        navigate(`/${apiRoute.CATEGORY}/${selectedCategoryId ?? 1}`, {
            state: {
                keyword: keyword,
                categoryId: selectedCategoryId ?? 1,
                subCategoryId: selectedSubCategoryId,
                page: 0,
            },
        });
    };

    return (
        <div className={classes["input-group"]}>
            <div className={classes["input-form"]} ref={ref}>
                <button className={classes["btn-dropdown"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                    {currentCategory}
                    {isDropdownOpen && <SearchBarDropdown changeFilterHandler={changeFilterHandler} />}
                    <Icon icon="ant-design:caret-down-filled" className={classes["icon-dropdown"]} />
                </button>
                <input
                    aria-label="Product input field"
                    placeholder="Tìm kiếm mọi thứ ..."
                    className={classes["input-field"]}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSearch(e.currentTarget.value);
                        }
                    }}
                    ref={inputRef}
                />
            </div>
            <button className={classes["btn-search"]}>
                <Icon
                    icon="akar-icons:search"
                    width={20}
                    height={20}
                    className={classes["btn-icon-search"]}
                    onClick={() => onSearch(inputRef.current?.value ?? "")}
                />
            </button>
        </div>
    );
}
