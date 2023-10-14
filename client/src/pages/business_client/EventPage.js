import React, {useEffect, useState} from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import AppBar from "../../shared/ui/app_bar/AppBar";
import {useAppContext} from "../../context/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Logo from "../../shared/ui/logo/Logo";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import Block from "../../shared/ui/block/Block";
import EventPublishAction from "../../widgets/event/event_publish_action/EventPublishAction";
import AppFooter from "../../widgets/app_footer/AppFooter";
import Container from "../../shared/ui/box/Container";
import IconLocation from '../../assets/icons/location_on_FILL0_wght400_GRAD0_opsz48.svg'
import IconCalendar from '../../assets/icons/event_FILL0_wght400_GRAD0_opsz48.svg'

import './eventPage.css'
import EventSlider from "../../widgets/event/event_slider/EventSlider";
import ToggleTheme from "../../widgets/toggle_them/ToggleTheme";
import TagsGroup from "../../shared/ui/tags_group/TagsGroup";
import TagsItem from "../../shared/ui/tags_group/TagsItem";
import BookCrossing from "../../widgets/book_crossing/BookCrossing";
import VoteTimer from "../../widgets/vote_timer/VoteTimer";
import ChooseBook from "../../widgets/choose_book/ChooseBook";
import Grid from "../../shared/ui/grid/Grid";
import Typography from "../../shared/ui/typography/Typography";
import CreateBook from "../../widgets/create_book/CreateBook";
import Card from "../../shared/ui/card/Card";
import BookOffers from "../../widgets/book_offers/BookOffers";
import VoteViewSettings from "../../features/room/VoteViewSettings";
import useToggle from "../../hooks/useToggle";
import Link from "../../shared/ui/link/Link";
import Button from "../../shared/ui/button/Button";

export default function EventPage(){

    const { authHandler, adaptiveHandler } = useAppContext();
    const { user, isAuthenticated, userLoading, isOffline } = authHandler;
    const { device } = adaptiveHandler;

    const navigate = useNavigate()
    const { id:roomId } = useParams(); // переименовываем id в activeConversationId

    const [roomData, setRoomData] = useState(null)


    const [isActiveModal, toggle] = useToggle(false);
    const [voteViewSettingValue, setVoteViewSettingValue] = useState(localStorage.getItem('voteViewSettingValue') || null)


    useEffect(() => {

        // Отправка GET-запроса
        fetch(`http://localhost:3000/api/room/${roomId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Произошла ошибка при отправке запроса');
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
                setRoomData(data)
            })
            .catch(error => {
                console.error(error);
            });

        // if (voteViewSettingValue === null) {
        //     toggle(true)
        // }

        // console.log("VOTEEEE", voteViewSettingValue)
    }, []);


    function toDisplayedLinkText(text) {
        if (text) {
            // Регулярное выражение для поиска ссылки
            const linkRegex = /(https?:\/\/[^\s]+)/g;

            // Замена ссылок в тексте на ссылки с тегом <a>
            let replacedText = text.replace(linkRegex, function (url) {
                return '<a href="' + url + '">' + url + '</a>';
            });
            // // Замена символа новой строки (\n) на тег <br>
            // replacedText = replacedText.replace(/\n/g, '<br>');
            //
            // // Замена символа табуляции (\t) на тег <span> с CSS классом для отступа
            // replacedText = replacedText.replace(/\t/g, '<span class="tab"></span>');
            //
            // // Замена символа возврата каретки (\b) на тег <span> с CSS классом для удаления символа
            // replacedText = replacedText.replace(/\b/g, '<span class="backspace"></span>');

            return replacedText
        }
    }


    function onBookOffered(bookOffer) {



    }




    return (<>
        <AppBar padding={'10px'}>
            {device !== 'mobile' ? <GroupInline>
                    <Logo />
                    <Nav left={35}>
                        <NavLink text={'Главная'} onClick={e => navigate('/', {replace: true,})}/>
                        <NavLink text={'Библиотека'} onClick={e => navigate('/event', {replace: true,})}/>
                        <NavLink text={'Блог'}/>
                    </Nav>
                </GroupInline> : <>
                    <button onClick={e => {navigate(-1)}}>back</button>
                </>
            }

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
            {/*<EventSlider photos={[1,2,3,4]}/>*/}


            <Container>
                { (isActiveModal || voteViewSettingValue === null) && <VoteViewSettings title={'Настройте отображение количества голосов'} onClick={setVoteViewSettingValue} onClose={toggle}/> }

                <div className="event-page">


                    <Block>
                        <VoteTimer data={roomData} />
                    </Block>

                    <Block isAlignCenter={true} bottom={30}>
                        <Block maxWidth={600} isAlignCenter={true}>
                            <Button bottom={10} onClick={toggle} width={'fit-content'} variant={'outline'} size={'small'}>Настройки</Button>
                            <CreateBook roomId={roomId} onChosenBook={onBookOffered} />
                        </Block>
                    </Block>

                    <Block isAlignCenter={true}>
                        <BookOffers voteViewSettingValue={voteViewSettingValue} roomId={roomId}/>
                    </Block>

                    {/*<div className="event-page__title">{eventsInfo?.caption}</div>*/}
                    {/*<TagsGroup>*/}
                    {/*    <TagsItem label={'category1'}/>*/}
                    {/*    <TagsItem label={'category2'}/>*/}
                    {/*    <TagsItem label={'category3'}/>*/}
                    {/*    <TagsItem label={'category4'}/>*/}
                    {/*    <TagsItem label={'category5'}/>*/}
                    {/*</TagsGroup>*/}
                    {/*/!*<BookCrossing />*!/*/}
                    {/*<div className="event-page-row">*/}
                    {/*    <div className="event-page-block">*/}
                    {/*        <div className="event-page-block__icon">*/}
                    {/*            <IconLocation width={25} height={25} />*/}
                    {/*        </div>*/}
                    {/*        <div className="event-page-block__text">*/}
                    {/*            {eventsInfo?.address}*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="event-page-block">*/}
                    {/*        <div className="event-page-block__icon">*/}
                    {/*            <IconCalendar width={25} height={25} />*/}
                    {/*        </div>*/}
                    {/*        <div className="event-page-block__text">*/}
                    {/*            {eventsInfo?.start_date} {eventsInfo?.end_date && ' - '+eventsInfo?.end_date}*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*/!*<div className="event-page-block">*!/*/}
                    {/*/!*    <div className="event-page-block__icon">*!/*/}

                    {/*/!*    </div>*!/*/}
                    {/*/!*    <div className="event-page-block__text">*!/*/}

                    {/*/!*    </div>*!/*/}
                    {/*/!*</div>*!/*/}
                    {/*<div className="event-page-description">*/}
                    {/*    <div className="event-page-description__title">*/}
                    {/*        Описание*/}
                    {/*    </div>*/}
                    {/*    <div className="event-page-description__text"*/}
                    {/*         dangerouslySetInnerHTML={{ __html: toDisplayedLinkText(eventsInfo?.description) }}*/}
                    {/*    >*/}
                    {/*        /!*<pre>*!/*/}
                    {/*        /!*    {toDisplayedLinkText(eventsInfo?.description)}*!/*/}
                    {/*        /!*</pre>*!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*/!*<EventPageHeader />*!/*/}
                </div>
            </Container>
        </Box>
        <AppFooter />
    </>)
}
