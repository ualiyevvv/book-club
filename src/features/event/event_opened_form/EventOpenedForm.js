import React from "react";

import Typography from "../../../shared/ui/typography/Typography";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import Input from "../../../shared/ui/input/Input";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Modal from "../../../shared/ui/modal/Modal";

export default function EventOpenedForm({title='', onClose, item}) {

    function onSubmit() {
        console.log('event opened form')
    }

    return(<>
        <Modal minWidth={720} maxWidth={1000} onClose={onClose}>
            <form>
                <Block bottom={40} isAlignCenter={true}>
                    <Typography weight={700} size={24}>{title}</Typography>
                </Block>

                <Block>
                    <Typography weight={600} size={18}>Общее</Typography>
                    <GroupInput>
                        <Input
                            type={'text'}
                            name={'name'}
                            value={item ? item.name : ''}
                            placeHolder={'Название *'}
                            onChange={f=>f}
                            required
                        />
                        <Input
                            type={'number'}
                            name={'stars'}
                            value={''}
                            placeHolder={'Звездность *'}
                            onChange={f=>f}
                            required
                        />
                    </GroupInput>
                </Block>


                <GroupButtons top={20}>
                    <Button type={'submit'} onClick={onSubmit}>Добавить</Button>
                    {/*<Button variant={'cancel'} onClick={onClose}>Отмена</Button>*/}
                </GroupButtons>
            </form>
        </Modal>
    </>)
}