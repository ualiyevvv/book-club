import React, {useEffect, useState} from "react";
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../app/AuthProvider";
import Input from "../../shared/ui/input/Input";
export default function SetName() {

    const {user, setName} = useAuth();
    const [nameForm, SetFormName] = useState('')
    const [message, setMessage] = useState(null);

    function onSave() {
        if (nameForm === '' ) {
            setMessage('Введите значение')
            return
        }
        console.log(user)
        setName(nameForm, user.id)
    }

    return (<>
        <Block bottom={20}>
            <Typography align={'center'} size={24} weight={700}>Как к вам обращаться?</Typography>
        </Block>
        <Block width={'100%'} isAlignCenter={true}>
            {message && <Typography size={16} bottom={10}>{message}</Typography>}
            <Input
                type="text"
                name="name"
                value={nameForm}
                placeHolder='Введите значение'
                onChange={e => SetFormName(e.target.value)}
                required
            />

            <Button type={'button'} onClick={onSave}>Сохранить</Button>
        </Block>
    </>)

}