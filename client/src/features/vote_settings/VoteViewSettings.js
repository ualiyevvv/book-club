import React from "react";
import Block from "../../shared/ui/block/Block";
import Typography from "../../shared/ui/typography/Typography";
import GroupButtons from "../../shared/ui/group_buttons/GroupButtons";
import Button from "../../shared/ui/button/Button";
import useVote from "../../app/hooks/useVote";
import {useAuth} from "../../app/AuthProvider";


export default function VoteViewSettings({title='', onClose}) {

    const {setVoteViewSettingValue} = useAuth()
    function onSubmit(value) {
        setVoteViewSettingValue(value)
        onClose()
    }

    return(<>
        <form>
            <Block bottom={30} isAlignCenter={true}>
                <Typography align={'center'} weight={700} size={24}>{title}</Typography>
            </Block>
            <GroupButtons top={20}>
                <Button type={'submit'} onClick={() => onSubmit(1)}>Показывать 👀</Button>
                <Button variant={'cancel'} onClick={() => onSubmit(2)}>Не показывать 🧿</Button>
            </GroupButtons>
        </form>
    </>)
}