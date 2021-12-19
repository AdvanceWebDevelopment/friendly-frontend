import { Icon } from "@iconify/react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { colors } from "../../constants/colors";

export const ScrollTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    useLayoutEffect(() => {
        window.onscroll = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button
                    ref={buttonRef}
                    className="rounded border-0 p-3"
                    style={{
                        zIndex: 999,
                        position: "fixed",
                        bottom: 15,
                        right: 15,
                        background: colors.primary,
                        boxShadow: "2px 2px 5px grey",
                    }}
                    onClick={() => {
                        window.scroll({ top: 0, behavior: "smooth" });
                    }}
                >
                    <div>
                        <Icon
                            icon="ant-design:up-outlined"
                            color={colors.subPrimary}
                            style={{ fontWeight: "bolder", fontSize: 16 }}
                        />
                    </div>
                </button>
            )}
        </div>
    );
};
