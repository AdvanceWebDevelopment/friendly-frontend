import * as React from "react";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { User } from "../../../models";
import classes from "./Bidder.module.css";
export interface BidderProps {
    totalBidCount: number;
    bidder?: User;
}

export default function Bidder({ totalBidCount, bidder }: BidderProps) {
    const [showBidderInfo, setShowBidderInfo] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hideBidderInfoWhenClickOutside = (e: MouseEvent) => {
            if (showBidderInfo && ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
                setShowBidderInfo(false);
            }
        };

        document.addEventListener("mousedown", hideBidderInfoWhenClickOutside);

        return () => {
            document.removeEventListener("mousedown", hideBidderInfoWhenClickOutside);
        };
    }, [showBidderInfo]);

    return (
        <div className={classes["bidder-img"]} onClick={() => setShowBidderInfo(!showBidderInfo)}>
            <div ref={ref} className={`${classes["bidder-info"]} p-2`} hidden={!showBidderInfo}>
                {bidder?.name}, {bidder?.points !== undefined ? bidder?.points + " điểm" : ""}
            </div>
            <Image
                src={bidder?.avatar}
                width="100%"
                height="100%"
                className="rounded-circle"
                style={{ objectFit: "cover" }}
            />
            <div className={classes["total-bid"]}>{totalBidCount <= 99 ? totalBidCount : "99+"}</div>
        </div>
    );
}
