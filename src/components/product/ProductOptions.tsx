import { Icon } from "@iconify/react";
import * as React from "react";
import HistoryBidModal from "./modal/history/HistoryBidModal";
import classes from "./ProductOptions.module.css";

export default function ProductOptions() {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const [showHistoryModal, setShowHistoryModal] = React.useState(false);

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

    const close = () => {
        setIsDropdownOpen(false);
    };

    const dummyFunc = () => {
        console.log("Click");
        close();
    };

    const showHistoryModalHandler = () => {
        setShowHistoryModal(true);
        close();
    };

    const closeHistoryModalHandler = () => {
        setShowHistoryModal(false);
    };

    return (
        <>
            <div className={classes.options} ref={ref}>
                <button className={classes["btn-options"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                    <Icon icon="bx:bx-dots-vertical" width={30} height={30} className={classes["option-icon"]} />
                </button>
                {isDropdownOpen && (
                    <ul className={classes.dropdown}>
                        <li className={classes.row} onClick={dummyFunc}>
                            <Icon icon="bx:bx-dollar-circle" width={24} height={24} className={classes.icon} />
                            <div className={classes.headings}>Mua Ngay</div>
                        </li>
                        <li className={classes.row} onClick={dummyFunc}>
                            <Icon icon="akar-icons:eye" width={24} height={24} className={classes.icon} />
                            <div className={classes.headings}>Theo Dõi</div>
                        </li>
                        <li className={classes.row} onClick={showHistoryModalHandler}>
                            <Icon icon="bi:table" width={20} height={20} className={classes.icon} />
                            <div className={classes.headings}>Lịch Sử Giá</div>
                        </li>
                        <li className={classes.row} onClick={dummyFunc}>
                            <Icon icon="clarity:note-edit-line" width={24} height={24} className={classes.icon} />
                            <div className={classes.headings}>Chỉnh Sửa</div>
                        </li>
                        <li className={classes.row} onClick={dummyFunc}>
                            <Icon icon="carbon:delete" width={24} height={24} className={classes["icon-last"]} />
                            <div className={classes.headings}>Xóa</div>
                        </li>
                    </ul>
                )}
            </div>
            <HistoryBidModal show={showHistoryModal} handleClose={closeHistoryModalHandler} />
        </>
    );
}