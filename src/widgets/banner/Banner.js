import React, {useRef} from "react";
import Slider from "react-slick";

import styles from './banner.module.css'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackIcon from "../../assets/icons/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import ForwardIcon from "../../assets/icons/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";

export default function Banner({slides}) {

    const sliderRef = useRef(null);

    const next = () => {
        sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current.slickPrev();
    };

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: styles['banner-dots'],
    };

    return (<div className={styles['banner']}>
        <Slider ref={sliderRef} {...settings}>
            {slides.map((photo, index) => {
                return (<>
                    <div className={styles['banner-image']} key={index}>
                        <h3>1</h3>
                    </div>
                </>)
            })}
        </Slider>
        <button className={`${styles['banner-button']} ${styles['banner-button--prev']}`} onClick={previous}>
            <BackIcon width={24} height={24} />
        </button>
        <button className={`${styles['banner-button']} ${styles['banner-button--next']}`} onClick={next}>
            <ForwardIcon width={24} height={24} />
        </button>
    </div>)
}
