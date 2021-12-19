import { Icon } from "@iconify/react";
import React from "react";
import { colors } from "../../../constants/colors";

interface SectionTitleProps {
    text?: string;
    className?: string;
}

export const SectionTitle = (props: SectionTitleProps) => {
    const { text, className } = props;

    return (
        <div className={`d-flex justify-content-start align-items-center ${className}`}>
            <Icon
                icon="emojione-monotone:glowing-star"
                color={colors.primary}
                fontSize={64}
                style={{ color: colors.primary }}
            />
            <div className="fw-bold" style={{ fontSize: "2rem" }}>
                {text}
            </div>
        </div>
    );
};
