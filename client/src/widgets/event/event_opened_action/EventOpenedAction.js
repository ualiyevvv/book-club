import React, {useState} from "react";

import Button from "../../../shared/ui/button/Button";
import LogoutForm from "../../../features/auth/logout/LogoutForm";
import useToggle from "../../../hooks/useToggle";
import EventOpenedForm from "../../../features/event/event_opened_form/EventOpenedForm";

export default function EventOpenedAction({}) {


    const [isActive, toggle] = useToggle(false);

    return(<>
        {isActive && <EventOpenedForm onClose={toggle}/>}
        <Button variant={ 'outline'} onClick={toggle}>Выйти из аккаунта</Button>
    </>)
}