import React, {useState, useEffect, useContext} from 'react';

import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
import Typography from "../../shared/ui/typography/Typography";
import HorizontalList from "../../shared/ui/horizontal_list/HorizontalList";
import EventCard from "../../widgets/event/event_card/EventCard";
import HorizontalListItem from "../../shared/ui/horizontal_list/HorizontalListItem";
import {useNavigate} from "react-router-dom";
import GroupButtons from "../../shared/ui/group_buttons/GroupButtons";
import CreateRoom from "../../features/admin/create_room/CreateRoom";
import AppContainer from "./AppContainer";
import {useAuth} from "../../app/AuthProvider";
import Overlay from "../../shared/ui/overlay/Overlay";
import Loader from "../../shared/ui/loader/Loader";
import useRoom from "../../app/hooks/useRoom";
import AdminPage from "../manager/AdminAllInOne";
import MyConfetti from "../../shared/confetti/Confetti";

const New = () => {

    const navigate = useNavigate();
    const { user, isAuth } = useAuth();
    const {isLoading, rooms, getRooms} = useRoom();

    useEffect(() => {
        getRooms()
    }, []);

    useEffect(() => {
        console.log('ROOMS',rooms)
    }, [rooms])

    if (isLoading) {
        return (<Overlay><Loader /></Overlay>)
    }

    return (
        <AppContainer isScrollable={true} isNavbar={true}>

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
            <Block>
                <HorizontalList bottom={20} title={'Обсуждения книг'} description={'Каждый месяц встречаемся и обсуждаем книгу'}>
                    {rooms.length < 1 && <Typography size={16} weight={500}>Обсуждений пока не было</Typography>}
                    {rooms.length > 0 && rooms.map( (room, index) => {
                        return(<>
                            <HorizontalListItem key={index}>
                                <EventCard item={room} key={room.id} />
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
        </AppContainer>
    )
}

export default New;
