import React, {useState} from 'react'

import styles from './Drawer.module.css'
import CloseIcon from "../../../assets/icons/close.svg";

export default function Drawer({title, onClose=f=>f, children}){

    const [isOpen, setIsOpen] = useState(false);
    const [startY, setStartY] = useState(null);
    const [currentY, setCurrentY] = useState(null);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleTouchStart = (event) => {
        setStartY(event.touches[0].clientY);
        setCurrentY(event.touches[0].clientY);
    };

    const handleTouchMove = (event) => {
        setCurrentY(event.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        if (startY && currentY) {
            const deltaY = currentY - startY;
            if (deltaY < -50) {
                toggleDrawer(); // Раскрываем панель при свайпе вверх
            } else if (deltaY > 50) {
                toggleDrawer(); // Закрываем панель при свайпе вниз
            }
        }
        setStartY(null);
        setCurrentY(null);
    };

    // const [extended, setExtended] = useState(true);

    return (
        <div className={`${styles.Drawer} ${isOpen && styles['Drawer--extended']}`}>
            <div className={styles.Drawer__header}
                 onTouchStart={handleTouchStart}
                 onTouchMove={handleTouchMove}
                 onTouchEnd={handleTouchEnd}
            >____</div>
            <div className={styles.Drawer__content}>
                {children}
            </div>
        </div>
    );
}