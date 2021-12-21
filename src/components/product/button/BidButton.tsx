import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./BidButton.module.css";
export interface BidButtonProps {
    openModal: () => void;
}

export default function BidButton({ openModal }: BidButtonProps) {
    return (
        <button className={classes["btn-bid"]} onClick={openModal}>
            <Icon icon="ri:auction-fill" width={24} height={24} className={classes["bid-icon"]} />
            <span>Ra giá</span>
        </button>
    );
}
