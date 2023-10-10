import React from 'react';

import styles from './box.module.css'

export default function Container({children, variant='', padding, isWrapper}){

    const style = {
        padding
    }
    return (
        <div className={`${styles.container} ${isWrapper && styles['container--wrapper']} `} style={style}>
            {/*<div className={styles.container}>*/}
            {children}
            {/*</div>*/}
        </div>
    );
}

