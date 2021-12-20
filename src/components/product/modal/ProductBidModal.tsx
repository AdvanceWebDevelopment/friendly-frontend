import { Icon } from "@iconify/react";
import * as React from "react";
import { Modal } from "react-bootstrap";
import classes from "./ProductBidModal.module.css";

export interface ProductModalProps {
    show: boolean;
    handleClose: () => void;
}

export default function ProductModal({ show, handleClose }: ProductModalProps) {
    const [productPrice, setProductPrice] = React.useState("");
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [currentMode, setCurrentMode] = React.useState("Thủ công");
    const paymentMode: string[] = ["Thủ công", "Tự động"];
    const ref = React.useRef<HTMLDivElement>(null);

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

    const formatNumber = (x: string): string => {
        return x?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let price = productPrice + e.target.validity.valid ? e.target.value : productPrice;
        setProductPrice(price);
    };

    const changeModeHandler = (mode: string) => {
        console.log(mode);
        setCurrentMode(mode);
        setIsDropdownOpen(false);
    };

    const renderPaymentModeList = () => {
        return paymentMode.map((mode, index) => {
            return (
                <li className={classes.row} key={index} onClick={() => changeModeHandler(mode)}>
                    {mode}
                </li>
            );
        });
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName={classes["modal-lg"]}
            contentClassName={classes["modal-content"]}
        >
            <Modal.Header closeButton className={classes["modal-header"]} />
            <Modal.Body className={classes["modal-body"]}>
                <h1 className={classes["product-name"]}>Mẫu hạm USS Enterprise</h1>
                <div className={classes["upload-info"]}>
                    <div className={classes["uploader-img"]} />
                    <div className={classes["uploader-name"]}>Hải Quân Hoa Kỳ</div>
                    <div className={classes.rating}>9.5</div>
                    <div className={classes["upload-date"]}>đăng từ 6/9/420</div>
                </div>
                <div className={classes["price-container"]}>
                    <div className={classes["current-price-container"]}>
                        <div className={classes.labels}>Giá Hiện Tại</div>
                        <div className={classes.price}>{formatNumber("150000000000")} VND</div>
                    </div>
                    <div className={classes["price-step"]}>
                        <div className={classes.labels}>Bước Giá</div>
                        <div className={classes.price}>{formatNumber("100000000")} VND</div>
                    </div>
                    <div className={classes["payment-mode"]} ref={ref}>
                        <div className={classes.labels} style={{ textTransform: "uppercase" }}>
                            Chế Độ
                        </div>
                        <button className={classes["btn-change"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                            <span>{currentMode}</span>
                            <Icon icon="ls:dropdown" className={classes.icon} />
                        </button>
                        {isDropdownOpen && <ul className={classes.dropdown}>{renderPaymentModeList()}</ul>}
                    </div>
                    <div className={classes["bid-input"]}>
                        <label className={classes.labels} htmlFor="bid-price" style={{ textTransform: "uppercase" }}>
                            Ra Giá
                        </label>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            id="bid-price"
                            className={classes["input-field"]}
                            onInput={handleChange}
                            value={productPrice}
                        />
                    </div>
                </div>
                <button className={classes["btn-confirm"]}>Xác Nhận</button>
            </Modal.Body>
        </Modal>
    );
}
