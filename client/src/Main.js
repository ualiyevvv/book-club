import React, {useContext, useEffect} from 'react';
import {useAppContext} from "./context/AppContext";
import Router from "./Router";
import useTheme from "./hooks/useTheme";

export default function Main(){
    // const { notificationsHandler } = useAppContext();
    //
    // // собирались тут писать модуль вывода обработки уведомлений
    // const { notifications } = notificationsHandler;

    const {theme, setTheme} = useTheme();

    return (<>
        {/*{_isModalOpened && <_Content />}*/}
        <Router />
    </>);
}
