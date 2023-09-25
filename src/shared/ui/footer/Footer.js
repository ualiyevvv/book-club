import React from "react";

import styles from './Footer.module.css'
import Logo from "../logo/Logo";
import Link from "../link/Link";
import Block from "../block/Block";
export default function Footer({}) {

    return (<>
        <div className={`
                ${styles['Footer']}
            `}
        >
            <div className={styles['Footer__block']}>
                <Logo />
                <Link text={'Политика конфиденциальности'} />
            </div>
            {/*<div className={styles['Footer__block']}>*/}
            {/*    <div className={styles['Footer__title']}>*/}
            {/*        О*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    </>)
}