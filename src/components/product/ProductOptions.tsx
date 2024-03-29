import { Icon } from "@iconify/react";
import * as React from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { requestDeleteProduct, setEditProduct } from "../../app/reducers/product-slice";
import { requestAddToWatchList, userActions } from "../../app/reducers/user-slice";
import { apiRoute } from "../../constants";
import { Product, UserRole } from "../../models";
import { ConfirmModal } from "../common/confirm-modal/confirm-modal";
// import HistoryBidModal from "./modal/history/HistoryBidModal";
import classes from "./ProductOptions.module.css";

interface ProductOptionsProps {
    product: Product;
}

const HistoryBidModal = React.lazy(() => import("./modal/history/HistoryBidModal"));

export default function ProductOptions({ product }: ProductOptionsProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const { user } = useAppSelector((state) => state.userState);

    const [showHistoryModal, setShowHistoryModal] = React.useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

    const [showBuyConfirmModel, setShowBuyConfirmModel] = React.useState(false);

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

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const showHistoryModalHandler = () => {
        setShowHistoryModal(true);
        closeDropdown();
    };

    const closeHistoryModalHandler = () => {
        setShowHistoryModal(false);
    };

    const sellingProducts = user.sellingProducts ?? [];

    const shouldHideEdit = () => {
        if (user.role === UserRole.BIDDER) {
            return true;
        }

        if (sellingProducts.find((item) => item.id === product?.id)) {
            return false;
        } else {
            return true;
        }
    };

    const onEditProduct = () => {
        dispatch(setEditProduct(true));
        navigate(`/${apiRoute.PRODUCT}/${product.id}`);
    };

    const onWatchProduct = () => {
        dispatch(requestAddToWatchList(product));
    };

    const onDeleteProduct = () => {
        if (user.role !== UserRole.ADMIN) {
            return;
        }

        setShowDeleteConfirm(true);
    };

    const onCancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    const onConfirmDelete = () => {
        setShowDeleteConfirm(false);

        dispatch(requestDeleteProduct(product));
    };

    const onBuyProduct = () => {
        setShowBuyConfirmModel(true);
    };

    const onCancelBuyProduct = () => {
        setShowBuyConfirmModel(false);
    };

    const onConfirmBuyProduct = () => {
        setShowBuyConfirmModel(false);
        dispatch(userActions.requestBuyProduct(product));
    };

    const requestToBidProduct = () => {
        closeDropdown();
        alert("Yêu cầu đang chờ được xử lý");

        dispatch(userActions.requestToBidProduct(product));
    };

    return (
        <>
            <div className={classes.options} ref={ref}>
                <button className={classes["btn-options"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                    <Icon icon="bx:bx-dots-vertical" width={30} height={30} className={classes["option-icon"]} />
                </button>
                {isDropdownOpen && (
                    <ul className={classes.dropdown}>
                        <li className={classes.row} onClick={onBuyProduct}>
                            <Icon icon="bx:bx-dollar-circle" width={24} height={24} className={classes.icon} />
                            <div className={classes.headings}>Mua Ngay</div>
                        </li>
                        <li
                            className={classes.row}
                            onClick={() => {
                                closeDropdown();
                                onWatchProduct();
                            }}
                        >
                            <Icon icon="akar-icons:eye" width={24} height={24} className={classes.icon} />
                            <div className={classes.headings}>Theo Dõi</div>
                        </li>
                        <li className={classes.row} onClick={showHistoryModalHandler}>
                            <Icon icon="bi:table" width={20} height={20} className={classes.icon} />
                            <div className={classes.headings}>Lịch Sử Giá</div>
                        </li>
                        <li className={classes.row} onClick={requestToBidProduct} hidden={user.email === undefined}>
                            <Icon icon="akar-icons:hand" width={20} height={20} className={classes.icon} />
                            <div className={classes.headings}>Xin Phép Ra Giá</div>
                        </li>
                        <li
                            className={classes.row}
                            onClick={() => {
                                closeDropdown();
                                onEditProduct();
                            }}
                            hidden={shouldHideEdit()}
                        >
                            <Icon icon="clarity:note-edit-line" width={24} height={24} className={classes.icon} />
                            <div className={classes.headings}>Bổ Sung</div>
                        </li>
                        <li
                            className={classes.row}
                            onClick={() => {
                                closeDropdown();
                                onDeleteProduct();
                            }}
                            hidden={user.role !== UserRole.ADMIN}
                        >
                            <Icon icon="carbon:delete" width={24} height={24} className={classes["icon-last"]} />
                            <div className={classes.headings}>Xóa</div>
                        </li>
                    </ul>
                )}
            </div>

            <React.Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto" />}>
                <HistoryBidModal show={showHistoryModal} handleClose={closeHistoryModalHandler} product={product} />
            </React.Suspense>

            <ConfirmModal
                show={showDeleteConfirm}
                headingTitle="Xác Nhận"
                bodyContent="Bạn có chắc là muốn xóa sản phẩm này?"
                onComfirm={onConfirmDelete}
                onCancel={onCancelDelete}
            />

            <ConfirmModal
                show={showBuyConfirmModel}
                headingTitle="Xác Nhận"
                bodyContent="Bạn có muốn mua luôn phẩm này?"
                onComfirm={onConfirmBuyProduct}
                onCancel={onCancelBuyProduct}
            />
        </>
    );
}
