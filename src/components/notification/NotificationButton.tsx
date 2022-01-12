import { Icon } from "@iconify/react";
import classes from "./NotificationButton.module.css";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { formatPrice, hideBidderName } from "../../utils";
import { Bid } from "../../models";
import { apiRoute } from "../../constants";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../app/reducers/user-slice";

export default function NotificationButton() {
    const { hasNotification, newBids } = useAppSelector((state) => state.userState);
    const ref = React.useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (isDropdownOpen && ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
                closeDropdown();
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [isDropdownOpen]);

    const closeDropdown = () => {
        setIsDropdownOpen(false);
        dispatch(userActions.setHasNotification(false));
    };

    const onNotificationClick = (bid: Bid) => {
        navigate(`/${apiRoute.PRODUCT}/${bid.product?.id}`);
    };

    return (
        <div ref={ref}>
            <button
                className={`${classes["notification-btn"]} mt-2`}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
                <Icon icon="clarity:bell-line" className={classes["notification-icon"]} />
                {hasNotification && <button className={`${classes["dot"]}`}></button>}
                {isDropdownOpen && (
                    <ul className={`${classes.dropdown}`}>
                        {newBids.map((bid, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`${classes["dropdown-item"]} p-2`}
                                    onClick={() => onNotificationClick(bid)}
                                >
                                    <div>
                                        {bid.bidAt?.toLocaleDateString("en-AU")}{" "}
                                        {bid.bidAt?.toLocaleTimeString("en-AU")}
                                    </div>
                                    <div>
                                        {hideBidderName(bid.bidder?.name ?? "")} đã ra giá{" "}
                                        {formatPrice(bid.bidPrice ?? 0)} cho {bid.product?.name}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </button>
        </div>
    );
}
