import React from "react";
import { Icon } from "@iconify/react";
import { colors } from "../../constants/colors";

interface CarouselArrowButtonProps {
    direction: "left" | "right";
    className?: string;
    onClick?: () => void;
}

export const CarouselArrowButton = (props: CarouselArrowButtonProps) => {
    const { direction, className, onClick } = props;

    return (
        <button
            className={`rounded-circle border-0 p-2 ${className}`}
            style={{
                background: colors.primary,
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
