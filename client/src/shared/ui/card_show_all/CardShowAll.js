import React from "react";
import styles from './cardShowAll.module.css'
import ForwardIcon from '../../../assets/icons/arrow_forward_FILL0_wght400_GRAD0_opsz48.svg'
export default function CardShowAll({onClick=f=>f}) {

    return(<div className={styles['CardShowAll']} onClick={onClick}>
        <div className={styles["CardShowAll__icon"]}>
            <ForwardIcon width={35} height={35} />
        </div>
        <div className={styles["CardShowAll__text"]}>
            Показать все
        </div>
    </div>)
}