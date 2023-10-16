import React, { useState, useEffect } from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import Container from "../../shared/ui/box/Container";
import Logo from "../../shared/ui/logo/Logo";
import Block from "../../shared/ui/block/Block";
import EventCategoryTabs from "../../widgets/event/event_category_tabs/EventCategoryTabs";
import AppBar from "../../shared/ui/app_bar/AppBar";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import Button from "../../shared/ui/button/Button";
import EventPublishAction from "../../widgets/event/event_publish_action/EventPublishAction";
import Typography from "../../shared/ui/typography/Typography";
import EventLocationSelect from "../../widgets/event/event_location_select/EventLocationSelect";
import EventList from "../../widgets/event/event_list/EventList";
import ToggleButtonWrapper from "../../shared/ui/toggle_button/ToggleButtonWrapper";
import {useAppContext} from "../../context/AppContext";
import Burger from "../../widgets/burger/Burger";
import HorizontalList from "../../shared/ui/horizontal_list/HorizontalList";
import EventCard from "../../widgets/event/event_card/EventCard";
import HorizontalListItem from "../../shared/ui/horizontal_list/HorizontalListItem";
import AppFooter from "../../widgets/app_footer/AppFooter";
import styles from "../../shared/ui/box/box.module.css";
import Banner from "../../widgets/banner/Banner";
import {useNavigate} from "react-router-dom";
import ToggleTheme from "../../widgets/toggle_them/ToggleTheme";
import ClubUsers from "../../widgets/club_users/ClubUsers";
import Footer from "../../shared/ui/footer/Footer";
import GroupButtons from "../../shared/ui/group_buttons/GroupButtons";
import Input from "../../shared/ui/input/Input";
import CreateRoom from "../../widgets/create_room/CreateRoom";

export default function New(){

    const navigate = useNavigate();
    const { authHandler, adaptiveHandler } = useAppContext();
    const { user, isAuthenticated, userLoading, isOffline } = authHandler;
    const { device } = adaptiveHandler;


    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Отправка GET-запроса
        fetch(`http://localhost:3000/api/room`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Произошла ошибка при отправке запроса');
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
                setRooms(data)
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    async function createUser() {

        // Отправка POST-запроса
        fetch(`http://localhost:3000/api/user/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify('room'),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Произошла ошибка при отправке запроса');
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch(error => {
                console.error(error);
            });
    }


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
                    <ToggleTheme />
                    {/*<Block left={20} width={'auto'}><EventPublishAction /></Block>*/}
                    <Nav left={20}>
                        <NavLink text={'Войти/Зарегистрироваться'} onClick={e => navigate('/authn', {replace: true,})}/>
                        {/*<NavLink text={''} onClick={e => navigate('/event', {replace: true,})}/>*/}
                    </Nav>
                </GroupInline>
            </AppBar>

            <Container scrollable={true}>

                <Box navbar={false} isDesktop={device === 'desktop'}>

                    <Block bottom={80}>
                        <CreateRoom />
                    </Block>
                    <Block top={40} bottom={20} isWrapper={true} padding={20}>
                        <Typography size={24} weight={600} bottom={12}>Начать</Typography>
                        <GroupButtons>
                            <Button size={'small'}>Книжный обмен</Button>
                            <Button size={'small'}>Выбор книги</Button>
                            <Button size={'small'} onClick={async () => await createUser}>user</Button>
                            <Button size={'small'}>Встречу</Button>
                        </GroupButtons>
                    </Block>

                    <Block bottom={20}></Block>

                    {/*<Block isWrapper={true}>*/}
                    {/*    <HorizontalList bottom={20} title={'Миссии'} description={'Выполняйте миссии, зарабатываете баллы и обменивайте их в магазине'}>*/}
                    {/*        {eventsDonerInfo.map( (eventsDonerInfoItem, eventIndex) => {*/}
                    {/*            return(<>*/}
                    {/*                <HorizontalListItem key={eventIndex}>*/}
                    {/*                    <EventCard item={eventsDonerInfoItem} />*/}
                    {/*                </HorizontalListItem>*/}
                    {/*            </>)*/}
                    {/*        })}*/}
                    {/*    </HorizontalList>*/}
                    {/*</Block>*/}
                    {/*<Block isWrapper={true}>*/}
                    {/*    <HorizontalList bottom={20} title={'Благотворительность'} description={'Периодически проводим благотворительные мероприятия'}>*/}
                    {/*        {eventsDonerInfo.map( (eventsDonerInfoItem, eventIndex) => {*/}
                    {/*            return(<>*/}
                    {/*                <HorizontalListItem key={eventIndex}>*/}
                    {/*                    <EventCard item={eventsDonerInfoItem} />*/}
                    {/*                </HorizontalListItem>*/}
                    {/*            </>)*/}
                    {/*        })}*/}
                    {/*    </HorizontalList>*/}
                    {/*</Block>*/}
                    <Block isWrapper={true}>
                        <HorizontalList bottom={20} title={'Обсуждения книг'} description={'Каждый месяц встречаемся и обсуждаем книгу'}>
                            {rooms.length < 1 && <Typography size={16} weight={500}>Обсуждений пока не было</Typography>}
                            {rooms.map( (room, index) => {
                                return(<>
                                    <HorizontalListItem key={index}>
                                        <EventCard item={room} />
                                    </HorizontalListItem>
                                </>)
                            })}
                        </HorizontalList>
                    </Block>
                    {/*<Block isWrapper={true}>*/}
                    {/*    <HorizontalList bottom={20} title={'Библиотека клуба'} description={'Можно одолжить книгу из списка на определенное время'} isShowAllBtn={true}>*/}
                    {/*        {eventsInfo.map( (eventInfo, eventIndex) => {*/}
                    {/*            return(<>*/}
                    {/*                <HorizontalListItem key={eventIndex}>*/}
                    {/*                    <EventCard item={eventInfo} />*/}
                    {/*                </HorizontalListItem>*/}
                    {/*            </>)*/}
                    {/*        })}*/}
                    {/*    </HorizontalList>*/}
                    {/*</Block>*/}

                    {/*<Container>*/}
                    {/*    <Block bottom={20}>*/}
                    {/*        <ClubUsers />*/}
                    {/*    </Block>*/}
                    {/*</Container>*/}
                    {/*<Banner slides={[1,2,3,4,5]} />*/}

                </Box>
                {/*<Footer />*/}
                <AppFooter />
        </Container>

        </>
    )
}
