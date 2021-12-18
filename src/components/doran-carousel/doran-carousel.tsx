import Carousel, { arrowsPlugin, CarouselBreakpoints, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import React, { useState } from "react";
import { CarouselArrowButton } from "./carousel-arrow-button";

export interface DoranCarouselProps {
    children: JSX.Element[];
    itemToShow?: number;
    className?: string;
    itemClass?: string;
    childrenSpacing?: number;
}

const breakpoints: CarouselBreakpoints = {
    640: {
        plugins: [
            {
                resolve: slidesToShowPlugin,
                options: {
                    numberOfSlides: 2,
                },
            },
        ],
    },
    900: {
        plugins: [
            {
                resolve: slidesToShowPlugin,
                options: {
                    numberOfSlides: 3,
                },
            },
        ],
    },
    1200: {
        plugins: [
            {
                resolve: slidesToShowPlugin,
                options: {
                    numberOfSlides: 4,
                },
            },
        ],
    },
};

export const DoranCarousel = (props: DoranCarouselProps) => {
    const { children, className, childrenSpacing, itemToShow = 3 } = props;

    const [value, setValue] = useState(0);
    const [leftArrowEnable, setLeftArrowEnable] = useState(false);
    const [rightArrowEnable, setRightArrowEnable] = useState(true);

    const onChange = (value: number) => {
        setLeftArrowEnable(value > 0);

        if (value + itemToShow < children.length) {
            setValue(value);
            setRightArrowEnable(true);
        } else if (value + itemToShow == children.length) {
            setValue(value);
            setRightArrowEnable(false);
        } else {
            setRightArrowEnable(false);
        }
    };

    return (
        <Carousel
            className={className}
            offset={childrenSpacing || 0}
            value={value}
            onChange={onChange}
            slides={children}
            plugins={[
                // Don't know why it doesn't work
                // {
                //     resolve: infinitePlugin,
                // },
                {
                    resolve: arrowsPlugin,
                    options: {
                        arrowLeft: (
                            <CarouselArrowButton
                                enabled={leftArrowEnable}
                                direction="left"
                                className="d-flex justify-content-center align-items-center rounded-circle p-2 mx-3 border-0"
                            />
                        ),
                        arrowRight: (
                            <CarouselArrowButton
                                enabled={rightArrowEnable}
                                direction="right"
                                className="d-flex justify-content-center align-items-center rounded-circle p-2 mx-3 border-0"
                            />
                        ),
                        addArrowClickHandler: true,
                    },
                },
                {
                    resolve: slidesToShowPlugin,
                    options: {
                        numberOfSlides: itemToShow,
                    },
                },
            ]}
            breakpoints={breakpoints}
        />
    );
};
