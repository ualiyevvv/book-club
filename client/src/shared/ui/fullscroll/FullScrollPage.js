import React from "react";
import styles from './FullScrollPage.module.css'

export default function FullScrollPage({children, id}) {

    return (<section className={styles.FullScrollPage} id={id}>
        {children}
    </section>)
}