import React, {useEffect, useState} from "react";

import styles from './VoteTimer.module.css'
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
import {useAuth} from "../../app/AuthProvider";
import useTimeForHuman from "../../shared/libs/helpers/useTimeForHuman";
export default function VoteTimer({data, isRoomEnd}) {

    // const timeRemaining = closingDate - currentTime;
    const {days, hours, minutes, seconds} = useTimeForHuman(data?.end_date, true)

    return (
        <div className={styles['VoteTimer']}>
            <div className={styles.VoteTimer__title}>{data?.name}</div>
            <div className={styles.VoteTimer__description}>До конца голосования осталось:</div>
            <div className={styles.VoteTimer__timer}>
                {!isRoomEnd ? <>
                    {hours + (days*24)}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </> : 'Завершено' }
            </div>
        </div>
    )
}
