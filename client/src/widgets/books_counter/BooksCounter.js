import React from "react";
import styles from './BooksCounter.module.css'
export default function BooksCounter({booksLength=0, currentCounter=0}) {

    return (<div className={styles.BooksCounter}>
        <span>{currentCounter} / </span>{booksLength}
    </div>)
}