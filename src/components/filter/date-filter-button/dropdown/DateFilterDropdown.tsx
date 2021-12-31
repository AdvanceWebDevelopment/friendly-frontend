import * as React from "react";
import classes from "./DateFilterDropdown.module.css";

interface DateFilterDropdownProps {
    onSortedBy: (type: string) => void;
    onOrderedBy: (type: string) => void;
}
export default function DateFilterDropdown({ onSortedBy, onOrderedBy }: DateFilterDropdownProps) {
    return (
        <div className={classes["dropdown"]}>
            <div className={classes["sort-by"]}>
                <div className={classes.headings}>Xếp theo</div>
                <div className={classes.options}>
                    <div className={classes.option}>
                        <input
                            type="radio"
                            id="date"
                            name="sort"
                            value="date"
                            defaultChecked
                            className={classes.input}
                            onClick={() => onSortedBy("Ngày đăng")}
                        />
                        <label htmlFor="date" className={classes.label}>
                            Ngày đăng
                        </label>
                    </div>
                    <div className={classes.option}>
                        <input
                            type="radio"
                            id="price"
                            name="sort"
                            value="price"
                            className={classes.input}
                            onClick={() => onSortedBy("Giá bán")}
                        />
                        <label htmlFor="date" className={classes.label}>
                            Giá bán
                        </label>
                    </div>
                </div>
            </div>
            {/* <div className={classes["order-by"]}>
                <div className={classes.headings}>Thứ tự</div>
                <div className={classes.options}>
                    <div className={classes.option}>
                        <input
                            type="radio"
                            id="newest"
                            name="order"
                            value="newest"
                            defaultChecked
                            className={classes.input}
                            onClick={() => onOrderedBy("Mới nhất")}
                        />
                        <label htmlFor="newest" className={classes.label}>
                            Mới nhất
                        </label>
                    </div>
                    <div className={classes.option}>
                        <input
                            type="radio"
                            id="oldest"
                            name="order"
                            value="oldest"
                            className={classes.input}
                            onClick={() => onOrderedBy("Cũ nhất")}
                        />
                        <label htmlFor="oldest" className={classes.label}>
                            Cũ nhất
                        </label>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
