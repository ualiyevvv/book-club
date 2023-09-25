import React, {useState} from "react";

import Button from "../../../shared/ui/button/Button";
import LogoutForm from "../../../features/auth/logout/LogoutForm";
import useToggle from "../../../hooks/useToggle";
import EventPublishForm from "../../../features/event/event_publish_form/EventPublishForm";

export default function EventPublishAction({}) {

    const [isActive, toggle] = useToggle(false);

    return(<>
        {isActive && <EventPublishForm onClose={toggle}/>}
        <Button size={'small'} variant={'outline'} onClick={toggle}>Опубликовать мероприятие</Button>
    </>)
}