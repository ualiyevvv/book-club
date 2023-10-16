import React from "react";
import Modal from "../../shared/ui/modal/Modal";
import Block from "../../shared/ui/block/Block";
import Typography from "../../shared/ui/typography/Typography";
import GroupButtons from "../../shared/ui/group_buttons/GroupButtons";
import Button from "../../shared/ui/button/Button";


export default function VoteViewSettings({title='', onClick=f=>f, onClose, item}) {

    function onSubmit(value) {
        onClick(value)
        localStorage.setItem('voteViewSettingValue', value);
        onClose()
        // console.log('hotel create submit')
    }

    return(<>
        <Modal minWidth={360} maxWidth={450} onClose={onClose}>
            <form>
                <Block bottom={40} isAlignCenter={true}>
                    <Typography align={'center'} weight={700} size={24}>{title}</Typography>
                </Block>
                <GroupButtons top={20}>
                    <Button type={'submit'} onClick={() => onSubmit(1)}>Показывать 👀</Button>
                    <Button variant={'cancel'} onClick={() => onSubmit(2)}>Не показывать 🧿</Button>
                </GroupButtons>
            </form>
        </Modal>
    </>)
}