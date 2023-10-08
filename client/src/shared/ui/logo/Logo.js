import React from 'react';

import styles from './logo.module.css' ;
import {useNavigate} from "react-router-dom";
// import LogoIcon from '../../../assets/icons/astana_events_logo.svg';

export default function Logo(){

    const navigate = useNavigate();

    return (
        <div className={styles.logo} onClick={e => navigate("/")}>
            {/*<LogoIcon />*/}
            {/*<a href="/main">LOGO</a>*/}
            LOGO
        </div>


    );
}

