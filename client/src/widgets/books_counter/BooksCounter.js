import React from "react";
import styles from './BooksCounter.module.css'
export default function BooksCounter({isVote=false, booksLength=0, currentCounter=0}) {

    return (<div className={`${styles.BooksCounter} ${isVote && styles['BooksCounter--vote']}`} >
        {!isVote && <><span>{currentCounter} / </span>{booksLength}</>}
        {isVote && <><span>{currentCounter} </span>✋</>}
    </div>)
}