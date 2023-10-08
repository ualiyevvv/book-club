import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import BottomNavigationAction from '../../shared/ui/bottom_navigation_action/BottomNavigationAction'
import BottomNavigation from '../../shared/ui/bottom_navigation/BottomNavigation'

import NewIcon from '../../assets/icons/Property 1=new.svg'
import MainIcon from '../../assets/icons/home_FILL0_wght400_GRAD0_opsz48.svg'
import ExploreIcon from '../../assets/icons/explore_FILL0_wght400_GRAD0_opsz48.svg'
import OrdersIcon from '../../assets/icons/Property 1=orders.svg'
import ChatIcon from '../../assets/icons/Property 1=chat.svg'
import ProfileIcon from '../../assets/icons/category.svg'

export default function NavigationPanel({ }){
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // подумать над неймингом роутов
    return (
        <BottomNavigation>
            <BottomNavigationAction label='Главная' icon={<MainIcon width={24} height={24}/>} active={pathname.startsWith('/main')} onClick={e => navigate('/main', {replace: true,})}  />
            <BottomNavigationAction label='Мероприятия' icon={<ExploreIcon width={24} height={24}/>} active={pathname.startsWith('/event')} onClick={e => navigate('/event', {replace: true,})}  />
            {/*<BottomNavigationAction label='Заказы' icon={<OrdersIcon/>} active={pathname.startsWith('/orders')} onClick={e => navigate('/orders', {replace: true,})}  />*/}
            {/*<BottomNavigationAction label='Чат' icon={<ChatIcon/>} active={pathname.startsWith('/chat')} onClick={e => navigate('/chat', {replace: true,})}  />*/}
            {/*<BottomNavigationAction label='Сервисы' icon={<ProfileIcon/>} active={pathname.startsWith('/profile')} onClick={e => navigate('/profile', {replace: true,})}  />*/}
        </BottomNavigation>
    );
}

