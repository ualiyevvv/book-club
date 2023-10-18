import React, {useEffect, useState} from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import {useNavigate, useParams} from "react-router-dom";
import Block from "../../shared/ui/block/Block";

import './eventPage.css'
import VoteTimer from "../../widgets/vote_timer/VoteTimer";
import CreateBook from "../../widgets/create_book/CreateBook";
import BookOffers from "../../widgets/book_offers/BookOffers";
import VoteViewSettings from "../../features/room/VoteViewSettings";
import useToggle from "../../hooks/useToggle";
import Button from "../../shared/ui/button/Button";
import SwiperCard from "../../widgets/SwiperCard/SwiperCard";
import FullScrollPage from "../../shared/ui/fullscroll/FullScrollPage";
import FullScrollPageContainer from "../../shared/ui/fullscroll/FullScrollPageContainer";
import Drawer from "../../shared/ui/drawer/Drawer";
import BookInfoWidget from "../../widgets/book_info/BookInfoWidget";
import BooksCounter from "../../widgets/books_counter/BooksCounter";
import Badge from "../../shared/ui/badge/Badge";
import Modal from "../../shared/ui/modal/Modal";
import CreatBookForm from "../../features/book/CreatBookForm";
import AppContainer from "./AppContainer";
import {useAuth} from "../../app/AuthProvider";

const EventPage = () => {

    const { adaptiveHandler } = useAuth();
    // const { user, isAuthenticated, userLoading, isOffline } = authHandler;
    const { device } = adaptiveHandler;

    const navigate = useNavigate()
    const { id:roomId } = useParams(); // переименовываем id в activeConversationId

    const [roomData, setRoomData] = useState(null)


    const [isActiveModal, toggle] = useToggle(false);
    const [voteViewSettingValue, setVoteViewSettingValue] = useState(localStorage.getItem('voteViewSettingValue') || null)

    const [isInViewport, setIsInViewport] = useState(false);


    const [books, setBooks] = useState([])
    const [isBooksLoaded, setIsBooksLoaded] = useState(false)

    const [activeSlide, setActiveSlide] = useState(0);
    const [isDrawerActive, setIsDrawerActive] = useState(true)

    const [isCreateBookModal, toggleCreateBookModal] = useToggle();

    const widthWindow = window.innerWidth;
    function getAllOffers() {
        // Отправка GET-запроса
        fetch(`http://localhost:3000/api/offer/${roomId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Произошла ошибка при отправке запроса');
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера BOOOOOKS:', data);
                const strinfiedBooks = []
                data.map(book => {
                    const newBook = {...book, info: JSON.parse(book.info)}
                    console.log('NEWEW BOOK', newBook)
                    strinfiedBooks.push(newBook);
                })
                setBooks(strinfiedBooks)
            })
            .catch(error => {
                console.error(error);
            });
        setIsBooksLoaded(true)
    }


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

        getAllOffers()



        // if (voteViewSettingValue === null) {
        //     toggle(true)
        // }

        // console.log("VOTEEEE", voteViewSettingValue)
    }, []);

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Обработчик события, вызывается при вхождении или выходе из зоны видимости
                // при изменении ширины экрана например, чето происходит что потом дравер не попадает в условия
                // ааа кажется это потому что компонент уходит, т.к чек на десктоп его убирает, и потом запускается return который сбрасывает слушание
                // нужно значить чекнуть return внутри useEffect
                /// по идее хотя, дравер должен же потом появится, т.к все равно значения должны обновиться но хз, нужно дебажить
                // но это проблема, т.к при повороте экрана все сбрасывается, но все равно можно потом чекнуть, это больше нужно для ui библы, чтобы потом под ключ все четко работало в других проектах
                setIsInViewport(entry.isIntersecting);
            },
            {
                root: null, // null означает viewport
                rootMargin: '0px', // Может быть настроено на ваши нужды
                threshold: 0.5, // Минимальное количество видимых пикселей, необходимое для активации
            }
        );

        // Укажите элемент, который вы хотите отслеживать
        const target = document.getElementById('section-with-drawer'); // Замените 'your-section-id' на ID вашей секции
        if (target) {
            observer.observe(target);
        }

        // Отмените наблюдение при размонтировании компонента
        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
        // console.log(widthWindow)
    }, [device]);


    // useEffect(() => {
    // }, []);


    return (
        <AppContainer>
            { (isActiveModal || voteViewSettingValue === null) && <VoteViewSettings title={'Настройте отображение голосов'} onClick={setVoteViewSettingValue} onClose={toggle}/> }

            <div className="event-page">

                {device === 'desktop'
                    ? <>
                        <Block>
                            <VoteTimer data={roomData} />
                        </Block>

                        <Block isAlignCenter={true} bottom={30}>
                            <Block maxWidth={600} isAlignCenter={true}>
                                <Button bottom={10} onClick={toggle} width={'fit-content'} variant={'outline'} size={'small'}>Настройки</Button>
                                <CreateBook roomId={roomId} />
                            </Block>
                        </Block>

                        <Block maxWidth={'100%'} isAlignCenter={true}>
                            <BookOffers voteViewSettingValue={voteViewSettingValue} roomId={roomId}/>
                        </Block>
                    </>
                    : <FullScrollPageContainer>
                        <FullScrollPage>
                            <Block>
                                <VoteTimer data={roomData} />
                            </Block>

                            <Block isAlignCenter={true} bottom={30}>
                                <Block maxWidth={600} isAlignCenter={true} padding={20}>
                                    <Button bottom={10} onClick={toggle} variant={'outline-white'}>Настройки</Button>

                                    {isCreateBookModal && <Modal minWidth={360} maxWidth={480} height={'80%'} onClose={toggleCreateBookModal}>
                                        <CreatBookForm roomId={roomId} setIsBookOffering={toggleCreateBookModal} />
                                    </Modal>}
                                    <Button onClick={toggleCreateBookModal} isBgLight={true}>Предложить книгу</Button>
                                </Block>
                            </Block>

                            <Badge bottom={50} text={'Листай вниз 👇'} air={true} left={0} right={0}/>
                        </FullScrollPage>



                        <FullScrollPage id={'section-with-drawer'}>
                            {/*<Block isAlignCenter={true}>*/}

                            <BooksCounter booksLength={books?.length} currentCounter={books?.length > 0 ? activeSlide+1 : 0} />

                            {isBooksLoaded && <>
                                <SwiperCard funcForAddCard={setIsDrawerActive} roomId={roomId} books={books} onChangeActiveSlide={setActiveSlide} />

                                {/*{!isDrawerActive &&*/}
                                {/*    <Container isWrapper={true}>*/}
                                {/*        <Button width={'100%'} bottom={20}>Проголосовать</Button>*/}
                                {/*        <Button width={'100%'} variant={'outline'} onClick={() => setIsDrawerActive(!isDrawerActive)}>Подробнее</Button>*/}
                                {/*    </Container>*/}
                                {/*}*/}

                                {isDrawerActive && books?.length > 0 && isInViewport &&
                                    <Drawer
                                        onClose={setIsDrawerActive}
                                        isDrawerActive={isDrawerActive}
                                        Buttons={<>
                                            { voteViewSettingValue == 1 && <BooksCounter isVote={true} currentCounter={books[activeSlide]?.votes_count} /> }
                                            <Button width={'100%'} isBgLight={true} variant={'yellow'}>Проголосовать ✋</Button>
                                        </>}
                                    >
                                        {/*{books.map((book, index) => {*/}
                                        {/*    return (<>*/}
                                        {/*        {book.info}*/}
                                        {/*    </>)*/}
                                        {/*})}*/}
                                        <BookInfoWidget book={books[activeSlide]} />

                                        {/*{books[activeSlide].info}*/}
                                    </Drawer>
                                }
                            </>}

                            {/*</Block>*/}
                        </FullScrollPage>
                    </FullScrollPageContainer>
                }





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
        </AppContainer>
    )
}

export default EventPage;
