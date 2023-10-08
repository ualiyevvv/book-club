import React from "react";
import {AddToCalendarButton} from "add-to-calendar-button-react";

import styles from './eventPageHeader.module.css'
export default function EventPageHeader() {
    return (
        <div className={styles["event-page-header"]}>
            <div className={`${styles["event-page-header__block"]} ${styles["event-page-date"]}`}>
                <div className={styles["event-page-calendar"]}>
                    <div className={styles["event-page-calendar__month"]}>
                        ИЮН
                    </div>
                    <div className={styles["event-page-calendar__date"]}>
                        11
                    </div>
                </div>
                <div className={styles["event-page-date-info"]}>
                    <div className={styles["event-page-date-info__easydate"]}>
                        Через 6 дней
                    </div>
                    <div className={styles["event-page-date-info__date"]}>
                        11 июня 18:00–21:00
                    </div>
                    <div className={styles["event-page-date-info__duration"]}>
                        Идёт 3 часа
                    </div>
                </div>
            </div>
            <div className={`${styles["event-page-header__block"]} ${styles["event-page-location"]}`}>
                Казахстан, Караганда
            </div>
            <div className={`${styles["event-page-header__block"]} ${styles["event-page-add_to_calendar"]}`}>
                <AddToCalendarButton
                    name="Test-Event"
                    startDate="2023-05-22"
                    options={['Apple','Google','Yahoo','iCal']}
                ></AddToCalendarButton>
            </div>
        </div>
    )
}