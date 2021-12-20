import React, { useRef, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { CarouselArrowButton } from "./carousel-arrow-button";
import Carousel, { slidesToShowPlugin, arrowsPlugin, Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useWindowDimensions } from "../../utils/hooks";

interface DoranShowroomCarouselProps {
    images?: string[];
    className?: string;
}

export const DoranShowroomCarousel = (props: DoranShowroomCarouselProps) => {
    const { images, className } = props;

    const [value, setValue] = useState(0);

    const onChange = (value: number) => {
        setValue(value);
    };

    const { width } = useWindowDimensions();

    return (
        <div>
            <Carousel
                className={className}
                value={value}
                onChange={onChange}
                plugins={[
                    "infinite",
                    {
                        resolve: arrowsPlugin,
                        options: {
                            arrowLeft: (
                                <CarouselArrowButton
                                    enabled={true}
                                    direction="left"
                                    className="d-flex justify-content-center align-items-center rounded-circle p-2 mx-3 border-0"
                                />
                            ),
                            arrowRight: (
                                <CarouselArrowButton
                                    enabled={true}
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
                            numberOfSlides: 1,
                        },
                    },
                ]}
            >
                {images?.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        width="100%"
                        height={width < 1440 ? 400 : 600}
                        style={{ objectFit: "cover", objectPosition: "center", borderRadius: 10 }}
                    />
                ))}
            </Carousel>
            <Dots
                value={value}
                onChange={onChange}
                thumbnails={images?.map((image, index) => (
                    <Image key={index} src={image} width="100%" height={100} style={{ objectFit: "cover" }} />
                ))}
            />
        </div>
    );
};
