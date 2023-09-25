import React from 'react';

import styles from './bottomNavigation.module.css'


export default function BottomNavigation({children}){

    return (
        <div className={styles["navigation"]}>
            {children}    
        </div>
    );
}

