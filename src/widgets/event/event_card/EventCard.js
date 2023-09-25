import React from 'react'
import Card from "../../../shared/ui/card/Card";
import CardServiceHeader from "../../../shared/ui/card_service/CardServiceHeader";
import CardServiceBody from "../../../shared/ui/card_service/CardServiceBody";
import CardServiceFooter from "../../../shared/ui/card_service/CardServiceFooter";
import Typography from "../../../shared/ui/typography/Typography";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../../shared/ui/button_like/ButtonLike";
import CardService from "../../../shared/ui/card_service/CardService";
import Gallery from "../../../shared/ui/gallery/Gallery";
import Stars from "../../../shared/ui/stars/Stars";

import styles from './eventCard.module.css'
import {useNavigate} from "react-router-dom";

export default function EventCard({item, onClick=f=>f}) {

    const navigate = useNavigate();

    return(<>
        <div className={styles["event-card"]} data-id="event-card" onClick={e => navigate(`/event/${item?.id}`)}>
            <div className={styles["event-card__header"]}>
                <div className={styles["event-card__free"]}>{item?.cost ? item?.cost : 'Бесплатно'}</div>
                <div className={styles["event-card__deadline"]}>{item?.isDone ? `Завершен` : `До конца регистрации ${item?.registration_deadline}`}</div>
                {/*<img src="" alt=""/>*/}
                <div className={styles["event-img"]}></div>
            </div>
            <div className={styles["event-card__body"]}>
                <div className={styles["event-card__caption"]}>{item?.caption}</div>
                <div className={styles["event-card--date"]}>24 сентября - 30 сентября</div>
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