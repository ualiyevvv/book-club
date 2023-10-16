import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
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
import Button from '../../../shared/ui/button/Button'
import AppBar from "../../../shared/ui/app_bar/AppBar";
import GroupInline from "../../../shared/ui/group_inline/GroupInline";
import Nav from "../../../shared/ui/nav/Nav";
import NavLink from "../../../shared/ui/nav/NavLink";
import Burger from "../../../widgets/burger/Burger";
import ToggleTheme from "../../../widgets/toggle_them/ToggleTheme";
import Block from "../../../shared/ui/block/Block";
import EventPublishAction from "../../../widgets/event/event_publish_action/EventPublishAction";
import Container from "../../../shared/ui/box/Container";
import Typography from "../../../shared/ui/typography/Typography";
import NavigationPanel from "../../../widgets/navigation_panel/NavigationPanel";
import AppFooter from "../../../widgets/app_footer/AppFooter";
/*
* 1) Не всегда при OAuth2 имеется имя, а в приложении хотелось бы иметь имя всегда.
* Для этого нужно, если нет имени пользователя, перенаправлять на страницу
* */
/**
 * type: [signin, sendActivationMail]
 * */
export default function Authentication(){

    const navigate = useNavigate();
    const { adaptiveHandler } = useAppContext();
    const { device } = adaptiveHandler;

    const logger = useMemo(()=>new Logger('Authentication'), []);

    const [tabType, setTabType] = useState('signin');

    // SignUp/SignIn должны быть в одном компоненте и OAuth тоже, все должно быть в одном Authentication page
    return (
        <>
            <AppBar padding={'10px'}>
                <GroupInline>
                    {device !== 'mobile'
                        ? <>
                            <Logo />
                            <Nav left={35}>
                                <NavLink text={'Главная'} onClick={e => navigate('/', {replace: true,})}/>
                                <NavLink text={'Библиотека'} onClick={e => navigate('/event', {replace: true,})}/>
                                <NavLink text={'Вступить'} onClick={e => navigate('/authn', {replace: true,})}/>
                                <NavLink text={'Блог'}/>
                            </Nav>
                        </>
                        : <Burger />
                    }
                </GroupInline>

                <GroupInline>
                    {/*<ToggleTheme />*/}
                    {/*<Block left={20} width={'auto'}><EventPublishAction /></Block>*/}
                    <Nav left={20}>
                        <NavLink text={'Войти/Зарегистрироваться'} onClick={e => navigate('/authn', {replace: true,})}/>
                        {/*<NavLink text={''} onClick={e => navigate('/event', {replace: true,})}/>*/}
                    </Nav>
                </GroupInline>
            </AppBar>
            <Box center={true}>

                <Container>
                    <Block isAlignCenter={true} top={60}>
                        <Card maxWidth={600} forAuth={true}>
                            <CardHeader>
                                {/*<Logo />*/}
                                <Block isAlignCenter={true}>
                                    <Typography align={'center'} size={28} weight={600}>Добро пожаловать</Typography>
                                </Block>
                            </CardHeader>

                            <CardBody>
                                {tabType === 'signup' && <SendActivationMail />}
                                {tabType === 'signin' && <SignIn />}
                                <br />
                                <Button variant='second'><a href={"/auth/azure"}>OpenID Connect</a></Button>
                            </CardBody>

                            <CardFooter>
                                {tabType === 'signup' && <TextWithLink text="Уже есть аккаунт?" linktext="Авторизация" onClick={() => setTabType('signin')} />}
                                {tabType === 'signin' && <>
                                    <TextWithLink text="Нет аккаунта?" linktext="Регистрация" onClick={() => setTabType('signup')} />
                                    <br/>
                                    <TextWithLink linktext="Забыли пароль?" onClick={e => navigate('/authn/send-reset')} />
                                </>}
                            </CardFooter>
                        </Card>
                    </Block>
                </Container>

            </Box>
            <AppFooter />
        </>
    );
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/
