import React from "react";
import Typography from "../../shared/ui/typography/Typography";

import styles from './appFooter.module.css'
import Container from "../../shared/ui/box/Container";
export default function AppFooter() {
    return (
        <footer className={styles['appFooter']}>
            <Container>
                <div  className={styles['appFooter__text']}>2023. Разработчик <a className={styles.appFooter__link} href="https://t.me/mitxp">@mitxp</a></div>
            </Container>
        </footer>
    )
}
