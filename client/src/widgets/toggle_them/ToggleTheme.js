import React from "react";
import ToggleButtonWrapper from "../../shared/ui/toggle_button/ToggleButtonWrapper";
import ToggleButton from "../../shared/ui/toggle_button/ToggleButton";
import useTheme from "../../hooks/useTheme";

import IconLight from '../../assets/icons/light_mode_FILL0_wght400_GRAD0_opsz48.svg';
import IconDark from '../../assets/icons/dark_mode_FILL0_wght400_GRAD0_opsz48.svg';

export default function ToggleTheme({}) {

    const {theme, setTheme} = useTheme();

    return (<>
        <ToggleButtonWrapper>
            <ToggleButton onClick={e => setTheme('dark')} isActive={theme==='dark'}>
                <IconDark width={25} height={25} fill={theme==='dark' && 'white'} />
            </ToggleButton>
            <ToggleButton onClick={e => setTheme('light')} isActive={theme==='light'}>
                <IconLight width={25} height={25} fill={theme==='light' && 'white'} />
            </ToggleButton>
        </ToggleButtonWrapper>
    </>)
}