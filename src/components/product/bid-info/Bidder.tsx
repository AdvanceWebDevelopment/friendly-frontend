import * as React from "react";
import classes from "./Bidder.module.css";
export interface BidderProps {
    totalBidCount: number;
    // bidderImg: string;
}

export default function Bidder({ totalBidCount }: BidderProps) {
    return (
        <div className={classes["bidder-img"]}>
            <div className={classes["total-bid"]}>{totalBidCount <= 99 ? totalBidCount : "99+"}</div>
        </div>
    );
}
