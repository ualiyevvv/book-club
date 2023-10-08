import React from "react";

import styles from './BookCrossing.module.css'
import TagsItem from "../../shared/ui/tags_group/TagsItem";
import TagsGroup from "../../shared/ui/tags_group/TagsGroup";
import Typography from "../../shared/ui/typography/Typography";
import Grid from "../../shared/ui/grid/Grid";
import EventCard from "../event/event_card/EventCard";
import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
export default function BookCrossing() {
    const orders = [1,2,3,4,5,6];
    return (
        <div className={styles['BookCrossing']}>
            <Block bottom={20}>
                <Button >Участвовать в книжном обмене</Button>
            </Block>
            <Grid columnGap={15} rowGap={15} repeat={4}>
                {orders.map( (order, index) => {
                    return (
                        <div className={styles['BookCrossing__order']}>
                            <div className={styles['BookCrossing__order__user']}>
                                Ayan
                            </div>
                            <div className={styles['BookCrossing__order__want']}>
                                <div className={styles['BookCrossing__order__give']}>
                                    <Typography>Обменяю:</Typography>
                                    <TagsGroup>
                                        <TagsItem label={'Евгений Спирица "Архетипы. Как понять себя и окружающих"'}/>
                                        <TagsItem label={'Эрих-Мария Ремарк "Триумфальная арка"'}/>
                                        <TagsItem label={'Мастер и Маргарита'}/>
                                        <TagsItem label={'Портрет Дориана Грей\n'}/>
                                    </TagsGroup>
                                </div>
                                <Typography>Предпочтения:</Typography>
                                <TagsGroup>
                                    <TagsItem label={'asd asdasdas asdasdsa'}/>
                                    <TagsItem label={'asd asdasdas asdasdsa'}/>
                                    <TagsItem label={'asd asdasdas asdasdsa'}/>
                                </TagsGroup>
                            </div>
                        </div>
                    )
                })}
            </Grid>
            <div className="BookCrossing__orders">

            </div>
        </div>
    )
}