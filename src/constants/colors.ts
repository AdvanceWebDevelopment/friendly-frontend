import React from "react";

export const colors = {
    subPrimary: getComputedStyle(document.documentElement).getPropertyValue("--sub-primary"),
    subSecondary: getComputedStyle(document.documentElement).getPropertyValue("--sub-secondary"),
    primary: getComputedStyle(document.documentElement).getPropertyValue("--primary"),
    background: getComputedStyle(document.documentElement).getPropertyValue("--background"),
};
