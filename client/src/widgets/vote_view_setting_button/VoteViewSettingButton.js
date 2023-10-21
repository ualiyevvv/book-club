import React from "react";
import Button from "../../shared/ui/button/Button";
import useToggle from "../../hooks/useToggle";
import useVote from "../../app/hooks/useVote";
import VoteViewSettingsModal from "../../features/vote_settings/VoteViewSettingsModal";
import {useAuth} from "../../app/AuthProvider";

export default function VoteViewSettingButton({variant}) {

    const { voteViewSettingValue } = useAuth()
    const [ isVoteSettingModalActive, toggleVoteSettingModal ] = useToggle()

    return (<>
        { (isVoteSettingModalActive || voteViewSettingValue === null) && <VoteViewSettingsModal toggle={toggleVoteSettingModal} /> }
        {variant === 'desktop'
            ? <Button bottom={10} onClick={toggleVoteSettingModal} width={'fit-content'} variant={'outline'} size={'small'}>
                Настройки
            </Button>
            : <Button bottom={10} onClick={toggleVoteSettingModal} variant={'outline-white'}>
                Настройки
            </Button>
        }
    </>)

}