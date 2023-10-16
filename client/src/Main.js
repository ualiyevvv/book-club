import React, {useContext, useEffect} from 'react';
import {useAppContext} from "./context/AppContext";
import Router from "./Router";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import useTheme from "./hooks/useTheme";

export default function Main(){
    const { notificationsHandler } = useAppContext();
    const { notifications } = notificationsHandler;

    const {theme, setTheme} = useTheme();

    return (<>
        {/*{_isModalOpened && <_Content />}*/}
        <Router />
    </>);
}
