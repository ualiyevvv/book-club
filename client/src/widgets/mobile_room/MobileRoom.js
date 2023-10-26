import React, {useEffect, useState} from "react";
import FullScrollPage from "../../shared/ui/fullscroll/FullScrollPage";
import Block from "../../shared/ui/block/Block";
import VoteTimer from "../vote_timer/VoteTimer";
import Button from "../../shared/ui/button/Button";
import CreateBookModal from "../../features/create_book/CreateBookModal";
import Badge from "../../shared/ui/badge/Badge";
import BooksCounter from "../books_counter/BooksCounter";
import SwiperCard from "../SwiperCard/SwiperCard";
import OfferDrawer from "../offer_drawer/OfferDrawer";
import FullScrollPageContainer from "../../shared/ui/fullscroll/FullScrollPageContainer";
import useToggle from "../../hooks/useToggle";
import {useAuth} from "../../app/AuthProvider";
import VoteViewSettingButton from "../vote_view_setting_button/VoteViewSettingButton";
import {useNavigate} from "react-router-dom";
import VoteStatisticsButton from "../vote_statistics_button/VoteStatisticsButton";


export default function MobileRoom({roomHash, roomData, offers=[]}) {

    const navigate = useNavigate()

    const { isAuth, adaptiveHandler } = useAuth();
    const { device } = adaptiveHandler;

    const [isInViewport, setIsInViewport] = useState(false);
    const [isDrawerActive, setIsDrawerActive] = useState(true)
    const [isCreateBookModal, toggleCreateBookModal] = useToggle();

    const [activeSlide, setActiveSlide] = useState(0);
    const {offerHandler} = useAuth()
    const {currentOffer} = offerHandler
    const [isRoomEnd, setIsRoomEnd] = useState(new Date() > new Date(roomData.end_date))

    useEffect(() => {
        intersectionObserver()
        // setCurrentOffer(offers[activeSlide])
        // console.log('OFFERS UPDATED')
    }, [offers]);

    useEffect(() => {
        // console.log('currentOffer', currentOffer)
    }, [currentOffer])

    function intersectionObserver() {
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
    }

    useEffect(() => {
        intersectionObserver()
    }, [device]);

    function onCreateOffer() {
        if (!isAuth) {
            navigate('/authn', {replace: true})
            // console.log('IS AUTH', isAuth)
        } else {
            toggleCreateBookModal()
        }
    }

    return (<FullScrollPageContainer>
        <FullScrollPage>
            <Block>
                <VoteTimer isRoomEnd={isRoomEnd} data={roomData} />
            </Block>

            <Block isAlignCenter={true} bottom={30}>
                <Block maxWidth={600} isAlignCenter={true} padding={20}>
                    <VoteStatisticsButton offers={offers} variant={'mobile'}/>
                    <VoteViewSettingButton variant={'mobile'}/>

                    {!isRoomEnd && <>
                        {isCreateBookModal && <CreateBookModal toggle={toggleCreateBookModal} roomHash={roomHash}/>}
                        <Button onClick={onCreateOffer} isBgLight={true}>Предложить книгу</Button>
                    </>}
                </Block>
            </Block>

            <Badge bottom={50} text={'Листай вниз 👇'} air={true} left={0} right={0}/>
        </FullScrollPage>


        <FullScrollPage id={'section-with-drawer'}>

            <BooksCounter booksLength={offers?.length} currentCounter={offers?.length > 0 ? activeSlide+1 : 0} />

            <SwiperCard isRoomEnd={isRoomEnd} funcForAddCard={setIsDrawerActive} roomHash={roomHash} books={offers} onChangeActiveSlide={setActiveSlide} />

            {/*{!isDrawerActive &&*/}
            {/*    <Container isWrapper={true}>*/}
            {/*        <Button width={'100%'} bottom={20}>Проголосовать</Button>*/}
            {/*        <Button width={'100%'} variant={'outline'} onClick={() => setIsDrawerActive(!isDrawerActive)}>Подробнее</Button>*/}
            {/*    </Container>*/}
            {/*}*/}

            {offers[activeSlide] && isDrawerActive && offers?.length > 0 && isInViewport &&
                <OfferDrawer isRoomEnd={isRoomEnd} roomHash={roomHash} isDrawerActive={isDrawerActive} setIsDrawerActive={setIsDrawerActive} offer={offers[activeSlide]}  />
            }

        </FullScrollPage>
    </FullScrollPageContainer>)
}