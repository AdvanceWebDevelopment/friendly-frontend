import { Icon } from "@iconify/react";
import * as React from "react";
import { Image, Modal } from "react-bootstrap";
import { Product } from "../../../../models";
import { formatNumber } from "../../../../utils/helpers";
import classes from "./ProductBidModal.module.css";

export interface ProductModalProps {
    show: boolean;
    handleClose: () => void;
    product?: Product;
    onConfirm?: (price: number) => void;
}

export enum BidMode {
    Manual,
    Auto,
}

export default function ProductModal({ show, handleClose, product, onConfirm }: ProductModalProps) {
    const [bidPrice, setBidPrice] = React.useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [currentMode, setCurrentMode] = React.useState(BidMode.Manual);
    const paymentMode: BidMode[] = [BidMode.Manual, BidMode.Auto];
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setBidPrice(product?.currentPrice! + product?.stepPrice!);
    }, [product]);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let price = e.target.validity.valid ? e.target.value : bidPrice;
        setBidPrice(price as number);
    };

    const changeModeHandler = (mode: BidMode) => {
        setCurrentMode(mode);
        setIsDropdownOpen(false);
    };

    const confirmBidHandler = () => {
        if (onConfirm) {
            onConfirm(bidPrice);
        }
        handleClose();
    };

    const renderPaymentModeList = () => {
        return paymentMode.map((mode, index) => {
            return (
                <li className={classes.row} key={index} onClick={() => changeModeHandler(mode)}>
                    {mode === BidMode.Manual ? "Thủ Công" : "Tự Động"}
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
                <h1 className={classes["product-name"]}>{product?.name}</h1>
                <div className={classes["upload-info"]}>
                    <div className={classes["uploader-img"]}>
                        <Image
                            src={product?.seller?.avatar}
                            style={{ width: "100%", height: "100%" }}
                            className="rounded-circle"
                        />
                    </div>
                    <div className={classes["uploader-name"]}>{product?.seller?.name}</div>
                    <div className={classes.rating}>{product?.seller?.points}</div>
                    <div className={classes["upload-date"]}>{product?.postDate?.toLocaleDateString("en-AU")}</div>
                </div>
                <div className={classes["price-container"]}>
                    <div className={classes["current-price-container"]}>
                        <div className={classes.labels}>Giá Hiện Tại</div>
                        <div className={classes.price}>{formatNumber(product?.currentPrice?.toString() ?? "")} VND</div>
                    </div>
                    <div className={classes["price-step"]}>
                        <div className={classes.labels}>Bước Giá</div>
                        <div className={classes.price}>{formatNumber(product?.stepPrice?.toString() ?? "")} VND</div>
                    </div>
                    <div className={classes["payment-mode"]} ref={ref}>
                        <div className={classes.labels} style={{ textTransform: "uppercase" }}>
                            Chế Độ
                        </div>
                        <button className={classes["btn-change"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                            <span>{currentMode === BidMode.Manual ? "Thủ Công" : "Tự Động"}</span>
                            <Icon icon="ls:dropdown" className={classes.icon} />
                        </button>
                        {isDropdownOpen && <ul className={classes.dropdown}>{renderPaymentModeList()}</ul>}
                    </div>
                    <div className={classes["bid-input"]}>
                        <label className={classes.labels} htmlFor="bid-price" style={{ textTransform: "uppercase" }}>
                            {currentMode === BidMode.Manual ? "Ra Giá" : "Giá Tối Đa"}
                        </label>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            id="bid-price"
                            className={classes["input-field"]}
                            onInput={handleChange}
                            defaultValue={bidPrice}
                            disabled={currentMode === BidMode.Auto && true}
                        />
                    </div>
                </div>
                <button className={classes["btn-confirm"]} onClick={() => confirmBidHandler()}>
                    Xác Nhận
                </button>
            </Modal.Body>
        </Modal>
    );
}
