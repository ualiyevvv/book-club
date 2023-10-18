import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import Logger from '../../../internal/Logger';
import {useAuth} from "../../../app/AuthProvider";
const logger = new Logger('Logout');

export default function Logout(){

    const navigate = useNavigate();

    const { logout } = useAuth();

    logger.log(logout());
    navigate('/');

    // return (<>
    //     <h1>[Logout page]</h1>
    //
    //     <button onClick={async e => {
    //         logger.log(await logout());
    //         navigate('/');
    //     }}>Logout</button>
    // </>);
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/