import styles from "./FullScrollPage.module.css";
import React from "react";

export default function FullScrollPageContainer({children}) {

    return (<div className={styles.FullScrollPageContainer} id={'fullPageContainer'}>
        {children}
    </div>)
}