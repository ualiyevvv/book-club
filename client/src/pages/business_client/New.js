import React, { useState, useEffect } from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import ServiceChoice from "../../widgets/service_choice/ServiceChoice";
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
import MapModal from "../../widgets/map/Map";
import Leaflet from "../../widgets/map/Leaflet";
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

export default function New(){

    const navigate = useNavigate();
    const { authHandler, adaptiveHandler } = useAppContext();
    const { user, isAuthenticated, userLoading, isOffline } = authHandler;
    const { device } = adaptiveHandler;

    const eventsInfo = [
        {id: 1, caption: 'Название', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 3, caption: 'Название мероприятия', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 4, caption: 'Название мероприятия воркшоп по анау мынау мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 5, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        // {id: 6, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
    ]
    const eventsDonerInfo = [
        {id: 1, caption: 'Название', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
         // {id: 6, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
    ]
    const eventsBookInfo = [
        {id: 1, caption: 'Название', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        // {id: 6, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
    ]

    return (
        <>
            <AppBar padding={'10px'}>
                <GroupInline>
                    {device !== 'mobile'
                        ? <>
                            <Logo />
                            <Nav left={40}>
                                <NavLink text={'Главная'} onClick={e => navigate('/', {replace: true,})}/>
                                <NavLink text={'Мероприятия'} onClick={e => navigate('/event', {replace: true,})}/>
                                <NavLink text={'Вступить'} onClick={e => navigate('/authn', {replace: true,})}/>
                                <NavLink text={'Блог'}/>
                            </Nav>
                        </>
                        : <Burger />
                    }
                </GroupInline>

                <GroupInline>
                    <ToggleTheme />
                    <Block left={20} width={'auto'}><EventPublishAction /></Block>
                </GroupInline>
            </AppBar>
            <Box navbar={true} isDesktop={device === 'desktop'}>
                <Container>
                    <Block top={20} bottom={20}>
                        <Typography size={24} weight={600} bottom={12}>Начать</Typography>
                        <GroupButtons>
                            <Button size={'small'}>Книжный обмен</Button>
                            <Button size={'small'}>Выбор книги</Button>
                            <Button size={'small'}>Встречу</Button>
                        </GroupButtons>
                    </Block>
                </Container>
                <HorizontalList bottom={20} title={'Миссии'} description={'Выполняйте миссии, зарабатываете баллы и обменивайте их в магазине'}>
                    {eventsDonerInfo.map( (eventsDonerInfoItem, eventIndex) => {
                        return(<>
                            <HorizontalListItem key={eventIndex}>
                                <EventCard item={eventsDonerInfoItem} />
                            </HorizontalListItem>
                        </>)
                    })}
                </HorizontalList>
                <HorizontalList bottom={20} title={'Благотворительность'} description={'Периодически проводим благотворительные мероприятия'}>
                    {eventsDonerInfo.map( (eventsDonerInfoItem, eventIndex) => {
                        return(<>
                            <HorizontalListItem key={eventIndex}>
                                <EventCard item={eventsDonerInfoItem} />
                            </HorizontalListItem>
                        </>)
                    })}
                </HorizontalList>
                <HorizontalList bottom={20} title={'Обсуждения книг'} description={'Каждый месяц встречаемся в кофейне и обсуждаем книгу'}>
                    {eventsBookInfo.map( (eventsBookInfoItem, eventIndex) => {
                        return(<>
                            <HorizontalListItem key={eventIndex}>
                                <EventCard item={eventsBookInfoItem} />
                            </HorizontalListItem>
                        </>)
                    })}
                </HorizontalList>
                {/*<Banner slides={[1,2,3,4,5]} />*/}
                <HorizontalList bottom={20} title={'Библиотека клуба'} description={'Можно одолжить книгу из списка на определенное время'} isShowAllBtn={true}>
                    {eventsInfo.map( (eventInfo, eventIndex) => {
                        return(<>
                            <HorizontalListItem key={eventIndex}>
                                <EventCard item={eventInfo} />
                            </HorizontalListItem>
                        </>)
                    })}
                </HorizontalList>
                <Container>
                    <Block bottom={20}>
                        <ClubUsers />
                    </Block>
                </Container>

            </Box>
            {/*<Footer />*/}
            {(device === 'mobile' || device === 'tablet') ? <NavigationPanel /> : <AppFooter /> }
        </>
    )
}