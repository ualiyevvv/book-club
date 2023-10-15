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

    return (<>
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
                            isActive && onChangeActiveSlide(index)
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
            <SwiperSlide>Add new book</SwiperSlide>
        </Swiper>
    </>);
}

