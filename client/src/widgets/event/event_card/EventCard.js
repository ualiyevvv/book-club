import React, {useEffect} from 'react'
import {formatRelative} from "date-fns";
import ruLocale from "date-fns/locale/ru";

import styles from './eventCard.module.css'
import {useNavigate} from "react-router-dom";

export default function EventCard({item, onClick=f=>f}) {

    const navigate = useNavigate();

    useEffect(() => {
        // console.log(item)
    }, []);

    return(<>
        <div className={styles["event-card"]} data-id="event-card" onClick={e => navigate(`/room/${item?.roomHash}`)}>
            <div className={styles["event-card__header"]}>
                {/*<div className={styles["event-card__free"]}>{item?.cost ? item?.cost : 'Бесплатно'}</div>*/}
                <div className={styles["event-card__deadline"]}>{new Date() > new Date(item?.end_date) ? `Завершен` : `Закроется ${formatRelative(new Date(item?.end_date), new Date(), {locale: ruLocale})}`}</div>
                {/*<img src="" alt=""/>*/}
                <div className={styles["event-img"]}></div>
            </div>
            <div className={styles["event-card__body"]}>
                <div className={styles["event-card__caption"]}>{item?.name}</div>
                {/*<div className={styles["event-card--date"]}>24 сентября - 30 сентября</div>*/}
                {/*<div className="event-card__location"></div>*/}
            </div>
        </div>
        {/*<CardService event={true} onClick={onClick}>*/}
        {/*    <CardServiceHeader>*/}
        {/*        <Stars />*/}
        {/*        {title}*/}
        {/*    </CardServiceHeader>*/}
        {/*    <CardServiceBody>*/}
        {/*        <Gallery height={160} />*/}
        {/*    </CardServiceBody>*/}
        {/*    <CardServiceFooter>*/}
        {/*        <GroupFlex>*/}
        {/*            <div>*/}
        {/*                <div><Typography size={16} weight={700} bottom={4}>{price}</Typography></div>*/}
        {/*                <div><Typography size={12} weight={500}>{addInfo}</Typography></div>*/}
        {/*            </div>*/}
        {/*            <ButtonLike />*/}
        {/*        </GroupFlex>*/}
        {/*    </CardServiceFooter>*/}
        {/*</CardService>*/}
    </>)
}
