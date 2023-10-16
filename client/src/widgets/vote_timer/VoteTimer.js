import React from "react";

import styles from './VoteTimer.module.css'
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
export default function VoteTimer({data=null}) {

    // TODO вынести кнопку Предложить книгу в CreateBook комопонент

    return (
        <div className={styles['VoteTimer']}>
            <div className={styles.VoteTimer__title}>{data?.name}</div>
            <div className={styles.VoteTimer__description}>До конца голосования осталось:</div>
            <div className={styles.VoteTimer__timer}>16:05:37</div>
        </div>
    )
}
