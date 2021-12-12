import React, { ReactElement } from "react";
import Carousel, { slidesToShowPlugin, arrowsPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { CarouselArrowButton } from "./carousel-arrow-button";

interface DoranCarouselProps {
    children: JSX.Element[] | undefined;
    className?: string;
    itemClass?: string;
    childrenSpacing?: number;
}

export const DoranCarousel = (props: DoranCarouselProps) => {
    const { children, className, itemClass, childrenSpacing } = props;

    const renderItems = children?.map((item) => (
        <div key={item.key} className={itemClass} style={item.props.style}>
            {item}
        </div>
    ));

    return (
        <Carousel
            className={className}
            offset={childrenSpacing}
            plugins={[
                "infinite",
                {
                    resolve: arrowsPlugin,
                    options: {
                        arrowLeft: (
                            <CarouselArrowButton
                                direction="left"
                                className="d-flex justify-content-center align-items-center rounded-circle p-2 mx-3 border-0"
                            />
                        ),
                        arrowRight: (
                            <CarouselArrowButton
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
                        numberOfSlides: 3,
                    },
                },
            ]}
        >
            {renderItems}
        </Carousel>
    );
};
