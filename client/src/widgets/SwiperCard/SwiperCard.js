import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import required modules
import { EffectCards } from 'swiper/modules';
import styles from './SwiperCard.module.css';
import useToggle from "../../hooks/useToggle";
import CreateBookModal from "../../features/create_book/CreateBookModal";
import {useAuth} from "../../app/AuthProvider";
export default function SwiperCard({funcForAddCard=f=>f, roomHash, books, onChangeActiveSlide=f=>f, isRoomEnd}){

    const navigate = useNavigate();
    const { isAuth } = useAuth();

    const [activeBg, setActiveBg] = useState('');

    function onActiveSlide(index, offerId, bg) {
        onChangeActiveSlide(index);
        setActiveBg(bg)
    }

    useEffect(() => {

    }, [])

    const [isCreateBookModal, toggle] = useToggle()


    function onCreateOffer() {
        if (!isAuth) {
            navigate('/authn', {replace: true})
        } else {
            toggle()
        }
    }

    return (<div className={styles.swiperDiv}>
        <div className={styles.swiperBg} style={{background: `url(${activeBg && activeBg}) center center/cover no-repeat`}}>
        </div>

        {isCreateBookModal && <CreateBookModal toggle={toggle} roomHash={roomHash} />}

        <div className={styles.swiperContainer}>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                {books.map((book, index) => {
                    return (
                        <SwiperSlide key={book.id}>
                            {/*{swiperSlide.isActive && <h1>ACTIVE</h1>}*/}
                            {({ isActive }) => {

                                isActive && onActiveSlide(index, book.id, book.info.img.src)

                                return (

                                    <img style={{height: '100%'}} src={book.info.img.src} alt={book.info.img.alt} />
                                    // <div>Current slide is {isActive ? index : 'not active'}</div>
                                )
                            }}
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
                {!isRoomEnd &&
                    <SwiperSlide onClick={onCreateOffer}>
                        {({ isActive }) => {

                            isActive ? funcForAddCard(false) : funcForAddCard(true)

                            return (
                                <div className={styles.swiper__addbook}>
                                    <span className={styles.swiper__plus}>+</span>
                                    <br/>
                                    <br/>
                                    Предложить <br/> книгу
                                </div>
                            )

                        }}
                    </SwiperSlide>
                }
            </Swiper>
        </div>
    </div>);
}

