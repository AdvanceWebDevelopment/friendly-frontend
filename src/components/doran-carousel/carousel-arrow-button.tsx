import React from "react";
import { Icon } from "@iconify/react";
import { colors } from "../../constants/colors";

interface CarouselArrowButtonProps {
    direction: "left" | "right";
    className?: string;
}

export const CarouselArrowButton = (props: CarouselArrowButtonProps) => {
    const { direction, className } = props;

    return (
        <button
            className={className}
            style={{
                background: colors.purple,
                boxShadow: "2px 4px 4px grey",
            }}
        >
            <Icon
                fontSize={24}
                color={colors.white}
                icon="ant-design:arrow-right-outlined"
                rotate={direction === "left" ? 90 : 0}
            />
        </button>
    );
};
