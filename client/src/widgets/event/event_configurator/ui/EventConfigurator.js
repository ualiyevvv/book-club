import React, {useState} from "react";

import styles from './eventConfigurator.module.css';
import ToggleButtonWrapper from "../../../../shared/ui/toggle_button/ToggleButtonWrapper";
import ToggleButton from "../../../../shared/ui/toggle_button/ToggleButton";

export const EventConfigurator = ({toggle='list', onChangeToggle=f=>f}) => {

    // const [toggleTab, setToggleTab] = useState('list')

    return (
        <div className={styles['EventConfigurator']}>
            <ToggleButtonWrapper>
                <ToggleButton onClick={e => onChangeToggle('list')} isActive={toggle==='list'}>
                    Списком
                </ToggleButton>
                <ToggleButton onClick={e => onChangeToggle('on-map')} isActive={toggle==='on-map'}>
                    На карте
                </ToggleButton>
            </ToggleButtonWrapper>
        </div>
    )
}

