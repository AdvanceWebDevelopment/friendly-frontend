import React from "react";
import { Icon } from "@iconify/react";
import { colors } from "../../constants/colors";

interface CarouselArrowButtonProps {
    direction: "left" | "right";
    className?: string;
    enabled?: boolean;
    onClick?: () => void;
}

export const CarouselArrowButton = (props: CarouselArrowButtonProps) => {
    const { direction, className, enabled, onClick } = props;

    return (
        <button
            className={`rounded-circle border-0 p-2 ${className}`}
            style={{
                background: enabled ? colors.primary : "grey",
                boxShadow: "2px 4px 4px grey",
            }}
            onClick={onClick}
        >
            <Icon
                fontSize={24}
                color={colors.subPrimary}
                icon="ant-design:arrow-right-outlined"
                rotate={direction === "left" ? 90 : 0}
            />
        </button>
    );
};
