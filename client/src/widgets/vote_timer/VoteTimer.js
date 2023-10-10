import React from "react";

import styles from './VoteTimer.module.css'
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
export default function VoteTimer({onActiveClick=f=>f}) {

    // TODO вынести кнопку Предложить книгу в CreateBook комопонент

    return (
        <div className={styles['VoteTimer']}>
            <Block isAlignCenter={true}>
                <Typography align={'center'} size={28} color={'black'} weight={700} bottom={14}>Название голосования</Typography>
                <Typography align={'center'} size={16} color={'black'} weight={500} bottom={2}>До конца голосования осталось:</Typography>
                <Typography align={'center'} size={28} color={'black'} weight={800}>16:05:37</Typography>
            </Block>
        </div>
    )
}
