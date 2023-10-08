import React, {useState} from "react";

import styles from './burger.module.css'
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import Logo from "../../shared/ui/logo/Logo";
import EventLocationSelect from "../event/event_location_select/EventLocationSelect";
export default function Burger({}) {

    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles['burger']}>
            {/*<EventLocationSelect />*/}
            {/*{!isActive && <div className={styles['burger-icon']} onClick={e => setIsActive(true)}>*/}
            {/*    <span></span>*/}
            {/*    <span></span>*/}
            {/*    <span></span>*/}
            {/*</div>}*/}

            {/*{isActive && <div className={styles['burger-icon--active']} onClick={e => setIsActive(false)}>*/}
            {/*    X*/}
            {/*</div>}*/}

            {/*{isActive && <>*/}
            {/*    <div className={styles["burger-nav"]}>*/}
            {/*        <Logo />*/}
            {/*        <Nav top={40}>*/}
            {/*            <NavLink text={'Мероприятия'}/>*/}
            {/*            <NavLink text={'Блог'}/>*/}
            {/*        </Nav>*/}
            {/*    </div>*/}
            {/*</>}*/}
        </div>
    )
}