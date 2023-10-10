import React, {useEffect, useMemo, useState} from 'react';

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';
import BottomControl from "../../shared/ui/bottom_control/BottomControl";
import Button from "../../shared/ui/button/Button";
import Logger from "../../internal/Logger";
import Container from "../../shared/ui/box/Container";
import {useNavigate} from "react-router-dom";
import OrderList from "../../widgets/order/order_list/OrderList";
import AppBar from "../../shared/ui/app_bar/AppBar";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Logo from "../../shared/ui/logo/Logo";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import Burger from "../../widgets/burger/Burger";
import Block from "../../shared/ui/block/Block";
import EventPublishAction from "../../widgets/event/event_publish_action/EventPublishAction";
import {useAppContext} from "../../context/AppContext";
import EventLocationSelect from "../../widgets/event/event_location_select/EventLocationSelect";
import ToggleButtonWrapper from "../../shared/ui/toggle_button/ToggleButtonWrapper";
import Leaflet from "../../widgets/map/Leaflet";
import EventCategoryTabs from "../../widgets/event/event_category_tabs/EventCategoryTabs";
import AppFooter from "../../widgets/app_footer/AppFooter";
import EventList from "../../widgets/event/event_list/EventList";
import ToggleButton from "../../shared/ui/toggle_button/ToggleButton";
import styles from "../../shared/ui/toggle_button/toggleButton.module.css";
import ToggleTheme from "../../widgets/toggle_them/ToggleTheme";
import {EventConfigurator} from "../../widgets/event/event_configurator";


export default function Orders({}){

    const { authHandler, adaptiveHandler } = useAppContext();
    const { user, isAuthenticated, userLoading, isOffline } = authHandler;
    const { device } = adaptiveHandler;
    const logger = useMemo(()=>new Logger('Orders'), [])
    const navigate = useNavigate();
    const [toggleTab, setToggleTab] = useState('list');


    const events = [
        // {id: 1, name: 'Event1', description: 'descr1', coordinates: {lat: 71.40785727041447, lng: 51.100919392489374}, },
        {id: 2, caption: 'Event2', description: 'descr2', coordinates: [51.11170294584818,71.40717028568645], },
        {id: 3, caption: 'Event3', description: 'descr3', coordinates: [51.127011269153854,71.41266616351251], },
        {id: 4, caption: 'Event4', description: 'descr4', coordinates: [51.117525018611616,71.43190173591029], },
        {id: 5, caption: 'Event5', description: 'descr5', coordinates: [51.13886634304586,71.4288103046323], },
        {id: 6, caption: 'Event6', description: 'descr6', coordinates: [51.08603395715704,71.42297093444037], },
        {id: 7, caption: 'Event7', description: 'descr7', coordinates: [51.1026449300918,71.4332757053682], },
    ]

    const geoJson = {
        "type": "FeatureCollection",
        "features": [
            { "type": "Feature",
                "properties": {id: 1, name: 'Event1', description: 'descr1'},
                "geometry": { "type": "Point", "coordinates": [71.40785727041447,51.100919392489374] }
            },
            { "type": "Feature",
                "properties": {id: 2, name: 'Event2', description: 'descr1'},
                "geometry": { "type": "Point", "coordinates": [71.40717028568645,51.11170294584818] }
            },
            { "type": "Feature",
                "properties": {id: 3, name: 'Event3', description: 'descr1'},
                "geometry": { "type": "Point", "coordinates": [71.4288103046323,51.13886634304586] }
            },
        ]
    };

    const eventsInfo = [
        {id: 1, isDone:true, category:"Meetups", caption: 'Название', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, isDone:true, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 3, isDone:false, category:"Conferences", caption: 'Название мероприятия', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 4, isDone:true, category:"Meetups", caption: 'Название мероприятия воркшоп по анау мынау мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 5, isDone:false, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 1, isDone:true, category:"Meetups", caption: 'Название', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, isDone:false, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 3, isDone:true, category:"Conferences", caption: 'Название мероприятия', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 4, isDone:false, category:"Meetups", caption: 'Название мероприятия воркшоп по анау мынау мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 5, isDone:true, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 1, isDone:true, category:"Meetups", caption: 'Название', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, isDone:false, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 3, isDone:false, category:"Conferences", caption: 'Название мероприятия', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 4, isDone:true, category:"Meetups", caption: 'Название мероприятия воркшоп по анау мынау мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 5, isDone:false, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 1, isDone:true, category:"Meetups", caption: 'Название', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, isDone:false, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 3, isDone:false, category:"Conferences", caption: 'Название мероприятия', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 4, isDone:true, category:"Meetups", caption: 'Название мероприятия воркшоп по анау мынау мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 5, isDone:false, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 1, isDone:true, category:"Meetups", caption: 'Название', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 2, isDone:false, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 3, isDone:false, category:"Conferences", caption: 'Название мероприятия', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 4, isDone:true, category:"Meetups", caption: 'Название мероприятия воркшоп по анау мынау мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        {id: 5, isDone:false, category:"Workshops", caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
        // {id: 6, caption: 'Название мероприятия воркшоп по анау мынау', start_date: '', end_date: '', registration_deadline: '', cost: null},
    ]

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(()=> {
        console.log('selectedCategory',selectedCategory)
    }, [selectedCategory])

    function filterEvents(events, category, isDone) {
        if (category && category !== 'All')
            return events.filter(event => event.category === category && (event.isDone === isDone));
        else return events.filter(event => event.isDone === isDone);
        // else if (!isDone)
        //     return events.filter(event => event.isDone === isDone);
    }

    return (<>
        <AppBar padding={'10px'}>
            <GroupInline>
                {device !== 'mobile'
                    ? <>
                        <Logo />
                        <Nav left={35}>
                            <NavLink text={'Главная'} onClick={e => navigate('/', {replace: true,})}/>
                            <NavLink text={'Библиотека'} onClick={e => navigate('/event', {replace: true,})}/>
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
        <Box navbar={true} isDesktop={device === 'desktop'}>
            <Container>
                <GroupInline isAlignStart={true}>
                    {/*<EventConfigurator toggle={toggleTab} onChangeToggle={setToggleTab} />*/}
                    <Block>
                        {toggleTab === 'list' ?
                            <EventList title={'Библиотека клуба'} description={'Можно одолжить книгу из списка на определенное время'} events={filterEvents(eventsInfo, selectedCategory, false)} />
                            : // <MapModal events={geoJson} />
                            <Leaflet markersData={events} />
                        }
                    </Block>
                </GroupInline>
            </Container>

            {/*<Container>*/}
            {/*    <Block top={20}>*/}
            {/*    </Block>*/}
            {/*    /!*<EventLocationSelect />*!/*/}
            {/*</Container>*/}

            {/*<EventCategoryTabs onChange={tab => setSelectedCategory(tab)} />*/}


        </Box>
        <AppFooter />
    </>)
}
