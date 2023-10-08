import React, {useEffect, useState} from "react";
import TabChip from "../../../shared/ui/tabchip/TabChip";
import GroupInline from "../../../shared/ui/group_inline/GroupInline";

import styles from './eventCategoryTabs.module.css'
import Container from "../../../shared/ui/box/Container";
export default function EventCategoryTabs({onChange=f=>f}) {

    const categories = [
        {id: 2, name: 'Meetups'},
        {id: 3, name: 'Workshops'},
        {id: 4, name: 'Conferences'},
        {id: 5, name: 'Internships'},
        {id: 6, name: 'Vacancies'},
    ]

    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        onChange(activeTab)
    }, [activeTab])

    return(
        <div className={styles['eventCategoryTabs']}>
            {/*<Container>*/}
                <div className={styles["eventCategoryTabs__list"]}>
                    <span></span>
                    <TabChip active={activeTab==='All'} text={'All'} onClick={e => setActiveTab('All')}/>
                    {categories.map((category, index) => {
                        return (<>
                            <TabChip active={activeTab===category?.name} text={category?.name} onClick={e => setActiveTab(category?.name)}/>
                        </>)
                    })}
                    <span></span>
                </div>
            {/*</Container>*/}
            {/*<div className={styles["eventCategoryTabs__list"]}>*/}
            {/*    <TabChip active={activeTab==='All'} text={'All'} onClick={e => setActiveTab('All')}/>*/}
            {/*    */}
            {/*</div>*/}
        </div>
    )
}