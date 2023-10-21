import {useEffect, useState} from "react";

export default function useTimeForHuman(closeDate, isRealTime=false, isPastDate=false) {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [closingDate, setClosingDate] = useState(new Date(closeDate))
    const [timeRemaining, setTimeRemaining] = useState(0)

    if (isRealTime) {
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentTime(new Date());
            }, 1000);

            return () => clearInterval(interval);
        }, []);

    }

    useEffect(() => {
        setTimeRemaining(closingDate-currentTime)
    }, [currentTime])


    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    if (isPastDate) {
        days *= -1;
        hours *= -1;
        minutes *= -1;
        seconds *= -1;
    }

    return({
        days,
        hours,
        minutes,
        seconds
    })
}