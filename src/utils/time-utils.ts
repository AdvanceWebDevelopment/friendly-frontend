import dayjs from "dayjs";
import { timeConstants } from "../constants";

export const timeUtils = {
    getRelativeEndDate(endDate?: Date) {
        const delta = dayjs(endDate).diff(new Date(), "minute") - timeConstants.TIMEZONE_DIFF_MINUTE;

        if (delta < 3 * 24 * 60) {
            return dayjs(Date.now()).to(endDate);
        }

        return endDate?.toLocaleDateString("en-AU");
    },
};
