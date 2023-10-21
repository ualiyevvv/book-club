import React, {useEffect} from "react";
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
import {useAuth} from "../../app/AuthProvider";
import {useNavigate} from "react-router-dom";
export default function ProfileFeature({user}) {

    const navigate = useNavigate();

    return (<>
        <Block isAlignCenter={true} bottom={20}>
            <Typography align={'center'} size={24} weight={700}>Профиль {user?.role === 'ADMIN' && '(ADMIN)'}</Typography>
        </Block>
        <Block isAlignCenter={true} bottom={30}>
            <Typography align={'center'} size={18} weight={500} bottom={10}>{user?.email}</Typography>
            <Typography align={'center'} size={18} weight={500}>{user?.name}</Typography>
        </Block>
        <Block>
            {user?.tg_confirmed
                ? <Button onClick={e=>e} isBgLight={true} variant={'outline'} bottom={10}>Telegram аккаунт подтвержден</Button>
                : <Button onClick={() => window.open(`https://t.me/aitubookclub_bot?start=${user?.tg_startHash}`)} isBgLight={true} bottom={10}>Подтвердить telegram аккаунт</Button>
            }
            <Button onClick={() => {navigate('/authn/logout', {replace: true})}} variant={'cancel'}>Выйти</Button>
        </Block>
    </>)

}