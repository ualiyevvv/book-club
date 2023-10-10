import React from 'react';

import styles from './logo.module.css' ;
import {useNavigate} from "react-router-dom";
import LogoIcon from '../../../assets/icons/aitu_book_club_logo.png';

export default function Logo(){

    const navigate = useNavigate();

    return (
        <div className={styles.logo} onClick={e => navigate("/")}>
            {/*<LogoIcon width={45} height={45} />*/}
            {/*<a href="/main">LOGO</a>*/}
            <img className={styles.logo__img} src={LogoIcon} alt=""/>
            {/*LOGO*/}
        </div>


    );
}

