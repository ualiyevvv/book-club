import React, {useState} from "react";

import EventCard from "../event_card/EventCard";
import Grid from "../../../shared/ui/grid/Grid";
import styles from "./eventList.module.css";
import Button from "../../../shared/ui/button/Button";

export default function EventList({events, title, description}) {

    const [visibleEvents, setVisibleEvents] = useState(4);

    // из-за контекста нарушается пагинация при переключении категорий
    function showMore(){
        setVisibleEvents(prevVisibleEvents => prevVisibleEvents + 4);
    };

    return(<div className={styles['EventList']}>
        <div className={styles["EventList__header"]}>
            {title && <div className={styles["EventList__title"]}>{title}</div>}
            {description && <div className={styles["EventList__description"]}>{description}</div>}
        </div>

        <Grid columnGap={15} rowGap={15} repeat={4}>
            {events.slice(0, visibleEvents).map( (event, index) => {
                return (
                    <EventCard item={event} key={index} />
                )
            })}
        </Grid>
        <div className={styles["EventList__show-more"]}>
            {visibleEvents < events.length && (
                <Button variant={'outline'} size={'small'} onClick={showMore}>Show More</Button>
            )}
        </div>
    </div>)
}