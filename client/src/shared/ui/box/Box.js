import React from 'react';

import styles from './box.module.css' 

export default function Box({isHorizontalCenter, children, center=false, navbar=false, menu=false, yummy=false, isDesktop=false}){
    return (
        <div className={`
            ${styles.box} 
            ${center ? styles['box--center'] : ''}
            ${navbar ? styles['box--navbar'] : ''}
            ${menu ? styles['box--menu'] : ''}
            ${yummy ? styles['box--yummy'] : ''}
            ${isDesktop && styles['box--desktop'] }
            ${isHorizontalCenter && styles['box--horizontal-center']}
        `}>
            {/*<div className={styles.container}>*/}
                {children}
            {/*</div>*/}
        </div>
    );
}

