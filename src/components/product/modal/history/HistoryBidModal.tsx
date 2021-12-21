import * as React from "react";
import { Modal } from "react-bootstrap";
import { formatNumber, hideBidderName } from "../../../../utils/helpers";
import classes from "./HistoryBidModal.module.css";
export interface HistoryBidModalProps {
    show: boolean;
    handleClose: () => void;
}

interface DummyHistory {
    id: number;
    date: string;
    time: string;
    bidder: string;
    price: string;
}

export default function HistoryBidModal({ show, handleClose }: HistoryBidModalProps) {
    const DUMMY_HISTORY: DummyHistory[] = [
        {
            id: 1,
            date: "01/11/2020",
            time: "3:30",
            bidder: "Michael Nguyen",
            price: "6000000",
        },
        {
            id: 2,
            date: "01/11/2020",
            time: "4:30",
            bidder: "Daniel Truong",
            price: "5000000",
        },
        {
            id: 3,
            date: "01/11/2020",
            time: "5:30",
            bidder: "Jason Dang",
            price: "4000000",
        },
    ];

    const renderHistory = () => {
        return DUMMY_HISTORY.map((each: DummyHistory) => {
            return (
                <tr key={each.id} className={classes.row}>
                    <td className={classes["date-time"]}>
                        <div className={classes.date}>{each.date}</div>
                        <div className={classes.time}>{each.time}</div>
                    </td>
                    <td>
                        <div className={classes.bidder}>{hideBidderName(each.bidder)}</div>
                    </td>
                    <td>
                        <div className={classes.price}>{formatNumber(each.price) + " VND"}</div>
                    </td>
                </tr>
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
                <table className={classes.table}>
                    <tr className={classes["table-header"]}>
                        <th>Thời Gian</th>
                        <th>Người Mua</th>
                        <th>Giá</th>
                    </tr>
                    {renderHistory()}
                </table>
            </Modal.Body>
        </Modal>
    );
}
