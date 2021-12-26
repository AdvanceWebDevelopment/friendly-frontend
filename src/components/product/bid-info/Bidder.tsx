import * as React from "react";
import { Image } from "react-bootstrap";
import classes from "./Bidder.module.css";
export interface BidderProps {
    totalBidCount: number;
    bidderImg?: string;
}

export default function Bidder({ totalBidCount, bidderImg }: BidderProps) {
    return (
        <div className={classes["bidder-img"]}>
            <Image src={bidderImg} />
            <div className={classes["total-bid"]}>{totalBidCount <= 99 ? totalBidCount : "99+"}</div>
        </div>
    );
}
