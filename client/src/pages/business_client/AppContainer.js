import React, {useContext} from "react";
import AppFooter from "../../widgets/app_footer/AppFooter";
import AppBar from "../../shared/ui/app_bar/AppBar";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Logo from "../../shared/ui/logo/Logo";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import {useNavigate} from "react-router-dom";
import Container from "../../shared/ui/box/Container";
import Box from "../../shared/ui/box/Box";
import {useAuth} from "../../app/AuthProvider";

const AppContainer = ({isHorizontalCenter=false, children, isBoxCentered}) => {

    const navigate = useNavigate();
    const { adaptiveHandler, user, isAuth, logout} = useAuth();
    const { device } = adaptiveHandler;


    return (<>
        <AppBar padding={'10px'}>
            {device !== 'mobile' ? <GroupInline>
                <Logo />
                <Nav left={35}>
                    <NavLink text={'Главная'} onClick={e => navigate('/', {replace: true,})}/>
                    <NavLink text={'Библиотека'} onClick={e => navigate('/event', {replace: true,})}/>
                    <NavLink text={'Блог'} onClick={e => navigate('/authn', {replace: true,})}/>
                </Nav>
            </GroupInline> : <Logo />
            }

            <GroupInline>
                {/*<ToggleTheme />*/}
                {/*<Block left={20} width={'auto'}><EventPublishAction /></Block>*/}
                <Nav left={20}>
                    {isAuth && <NavLink text={'Выйти'} onClick={() => logout()}/>}
                    {!isAuth && <NavLink text={'Войти/Зарегистрироваться'} onClick={e => navigate('/authn', {replace: true,})}/>}

                    {/*<NavLink text={''} onClick={e => navigate('/event', {replace: true,})}/>*/}
                </Nav>
            </GroupInline>
        </AppBar>

        <Container scrollable={true}>

            <Box isHorizontalCenter={isHorizontalCenter} navbar={false} center={isBoxCentered} isDesktop={device === 'desktop'}>
                {children}
            </Box>
        </Container>
        <AppFooter />
    </>)
}
export default AppContainer