import React from 'react'

import styles from './eventCardMap.module.css'
import {useNavigate} from "react-router-dom";

export default function EventCardMap({item}) {

    const navigate = useNavigate();

    return(<>
        <div className={styles["event-card-map"]} data-id="event-card" onClick={e => navigate(`/event/${item?.id}`)}>
            <div className={styles["event-card__header"]}>
                {/*<img src="" alt=""/>*/}
                <div className={styles["event-img"]}></div>
            </div>
            <div className={styles["event-card__body"]}>
                <div className={styles["event-card__caption"]}>{item?.caption}</div>
                <div className={styles["event-card--date"]}>24 сентября - 30 сентября</div>
                {/*<div className={styles["event-card__deadline"]}>До конца регистрации {item?.registration_deadline}</div>*/}
                {/*<div className={styles["event-card__free"]}>{item?.cost ? item?.cost : 'Бесплатно'}</div>*/}
                {/*<div className="event-card__location"></div>*/}
            </div>
        </div>
    </>)
}