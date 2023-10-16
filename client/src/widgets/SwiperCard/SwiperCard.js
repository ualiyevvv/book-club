import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import required modules
import { EffectCards } from 'swiper/modules';
import { Virtual } from 'swiper/modules';
import styles from './SwiperCard.module.css';
import { useSwiper, useSwiperSlide } from 'swiper/react';
export default function SwiperCard({books, onChangeActiveSlide=f=>f}){
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // const swiperSlide = useSwiperSlide();
    const [activeBg, setActiveBg] = useState('');

    function onActiveSlide(index, bg) {
        onChangeActiveSlide(index);
        setActiveBg(bg)
    }

    return (<div className={styles.swiperDiv}>
        <div className={styles.swiperBg} style={{background: `url(${activeBg && activeBg}) center center/cover no-repeat`}}>
        </div>
        <div className={styles.swiperContainer}>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                {books.map((book, index) => {
                    return (
                        <SwiperSlide>
                            {/*{swiperSlide.isActive && <h1>ACTIVE</h1>}*/}
                            {({ isActive }) => {

                                isActive && onActiveSlide(index, book.info.img.src)

                                return (

                                    <img style={{height: '100%'}} src={book.info.img.src} alt={book.info.img.alt} />
                                    // <div>Current slide is {isActive ? index : 'not active'}</div>
                                )
                            }
                            }
                            {/*{({isActive}) => (isActive && <h1>slide tata ${index} </h1>)}*/}
                        </SwiperSlide>
                    )
                })}
                {/*<SwiperSlide>Slide 2</SwiperSlide>*/}
                {/*<SwiperSlide>Slide 3</SwiperSlide>*/}
                {/*<SwiperSlide>Slide 4</SwiperSlide>*/}
                {/*<SwiperSlide>Slide 5</SwiperSlide>*/}
                {/*<SwiperSlide>Slide 6</SwiperSlide>*/}
                {/*<SwiperSlide>Slide 7</SwiperSlide>*/}
                {/*<SwiperSlide>Slide 8</SwiperSlide>*/}
                <SwiperSlide>
                    <div className={styles.swiper__addbook}>
                        <span className={styles.swiper__plus}>+</span>
                        <br/>
                        <br/>
                        Предложить <br/> книгу
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>);
}

