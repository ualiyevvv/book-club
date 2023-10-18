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
            <Typography align={'center'} size={24} weight={700}>Профиль</Typography>
        </Block>
        <Block isAlignCenter={true} bottom={40}>
            <Typography align={'center'} size={18} weight={500}>{user?.email}</Typography>
            <Typography align={'center'} size={18} weight={500}>{user?.name}</Typography>
        </Block>
        <Block>
            <Button onClick={e=>e} isBgLight={true} bottom={10}>Привязать telegram аккаунт</Button>
            <Button onClick={() => {navigate('/authn/logout', {replace: true})}} variant={'cancel'}>Выйти</Button>
        </Block>
    </>)

}