import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useNavigate, Redirect} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";

import Logger from '../../../internal/Logger';

import SignIn from '../../../features/auth/signin/Signin';
import SendActivationMail from "../../../features/auth/activation_send/SendActivationMail";

import Box from '../../../shared/ui/box/Box'
import Card from '../../../shared/ui/card/Card';
import CardHeader from '../../../shared/ui/card/CardHeader';
import Logo from '../../../shared/ui/logo/Logo';
import CardBody from '../../../shared/ui/card/CardBody';
import CardFooter from '../../../shared/ui/card/CardFooter';
import TextWithLink from '../../../shared/ui/text_with_link/TextWithLink'
import Block from "../../../shared/ui/block/Block";
import Container from "../../../shared/ui/box/Container";
import AppContainer from "../../business_client/AppContainer";
import {useAuth} from "../../../app/AuthProvider";
/*
* 1) Не всегда при OAuth2 имеется имя, а в приложении хотелось бы иметь имя всегда.
* Для этого нужно, если нет имени пользователя, перенаправлять на страницу
* */
/**
 * type: [signin, sendActivationMail]
 * */
const Authentication = () => {

    const navigate = useNavigate();
    const { adaptiveHandler, isAuth } = useAuth();
    const { device } = adaptiveHandler;

    // const logger = useMemo(()=>new Logger('Authentication'), []);

    const [tabType, setTabType] = useState('signin');

    if (isAuth) {
        return window.location.replace('/');
    } else {

        // SignUp/SignIn должны быть в одном компоненте и OAuth тоже, все должно быть в одном Authentication page
        return (<AppContainer isBoxCentered={true} isContainer={true}>

            <Block isAlignCenter={true} top={60}>
                <Card maxWidth={600}>
                    <CardHeader>
                        <Logo />
                        {/*<Block isAlignCenter={true}>*/}
                        {/*    <Typography align={'center'} size={28} weight={600}>Добро пожаловать</Typography>*/}
                        {/*</Block>*/}
                    </CardHeader>

                    <CardBody>
                        {tabType === 'signup' && <SendActivationMail />}
                        {tabType === 'signin' && <SignIn />}
                        <br />
                        {/*<Button variant='second'><a href={"/auth/azure"}>OpenID Connect</a></Button>*/}
                    </CardBody>

                    <CardFooter>
                        {tabType === 'signup' && <TextWithLink text="Уже есть аккаунт?" linktext="Авторизация" onClick={() => setTabType('signin')} />}
                        {tabType === 'signin' && <>
                            <TextWithLink text="Нет аккаунта?" linktext="Регистрация" onClick={() => setTabType('signup')} />
                            {/*<br/>*/}
                            {/*<TextWithLink linktext="Забыли пароль?" onClick={e => navigate('/authn/send-reset')} />*/}
                        </>}
                    </CardFooter>
                </Card>
            </Block>

        </AppContainer>);
    }

}

export default Authentication

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/
