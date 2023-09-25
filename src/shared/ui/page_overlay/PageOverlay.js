import React from "react";

import styles from './pageOverlay.module.css'
export default function PageOverlay({children}) {
    return(<div className={styles['PageOverlay']}>
        {children}
    </div>)
}