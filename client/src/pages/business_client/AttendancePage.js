import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../app/AuthProvider";
import UserService from "../../app/services/UserService";
import Overlay from "../../shared/ui/overlay/Overlay";
import Loader from "../../shared/ui/loader/Loader";
import Modal from "../../shared/ui/modal/Modal";
import Typography from "../../shared/ui/typography/Typography";
import TelegramAttach from "../../features/telegram_attach/TelegramAttach";
import AppContainer from "./AppContainer";
import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
import MyConfetti from "../../shared/confetti/Confetti";

export default function AttendancePage() {

    const navigate = useNavigate()

    const { qrHash } = useParams();
    const { user, isAuth, makeAttendee, isLoading } = useAuth();
    const [attendeeResponse, setAttendeeResponse] = useState(null)

    // вот например если проверка выше чем этот useeffect то сработает ли юзеффект??
    // федь проверка выше важная, и запросы в юз эффекте не должны запуститься, но он привязан на загрузку комопонента впервые,
    // так вот если компонент вызвался то запуститься ли он если даже проверка выше в коде находится,
    // но в жс многое неважно ведь он не строгий, а также есть variables lift поднятие переменных

    const fetchData = async () => {
        try {
            const res = await UserService.attend(user.id, qrHash)
            setAttendeeResponse(res.data)
            // console.log('setAttendeeResponse', res.data)
        } catch (e) {
        }
    };

    useEffect( () => {
        const controller = new AbortController();
        const options = {
            signal: controller.signal,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,// Set the appropriate content type
                // You can add other headers if needed, e.g., authentication headers
            },
        };

        if (isAuth && user.tg_confirmed) {
            fetch(`http://localhost:3000/api/attendee/${qrHash}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the response as JSON
                })
                .then(data => {
                    setAttendeeResponse(data)
                    // Handle the data from the response
                    // console.log(data);
                })
                .catch(error => {
                    // Handle any errors that occurred during the fetch
                    // console.error('Error:', error);
                });
        }

        return () => controller.abort();
    }, [])

    useEffect(() => {
        // console.log('attendeeResponse', attendeeResponse)
    }, [attendeeResponse]);


    if (!isAuth || !user) {
        return navigate('/authn')
    }

    if (isLoading || !attendeeResponse) {
        return <Overlay><Loader /></Overlay>
    }

    if (!user.tg_confirmed) {
        return (<Modal minWidth={340} maxWidth={600}>
                <Typography align={'center'} size={24} weight={700} bottom={20}>Повторите после подтверждения -></Typography>
                <TelegramAttach />
            </Modal>
        )
    }

    return (<>
        <AppContainer isBoxCentered={true} isHorizontalCenter={true}>
            {attendeeResponse?.level && <>
                <Modal minWidth={340} maxWidth={600}>
                    <Block isAlignCenter={true} bottom={20}>
                        <Typography align={'center'} size={24} weight={700}>🥳 Поздравляем у тебя новый уровень 🥳</Typography>
                    </Block>
                    <Block isAlignCenter={true} bottom={40}>
                        <Typography align={'center'} size={18} weight={500} bottom={10}>Теперь твой голос весит {attendeeResponse?.level.level_score} баллов.</Typography>
                        <Typography align={'center'} size={18} weight={500}>Продолжай в том же духе 🌟</Typography>
                    </Block>
                    <Block>
                        <Button onClick={() => navigate('/')} isBgLight={true} bottom={10}>На главную</Button>
                    </Block>
                </Modal>
                <MyConfetti />
            </>}


            {attendeeResponse?.attendees_count && <>
                <Modal minWidth={340} maxWidth={600}>
                    <Block isAlignCenter={true} bottom={20}>
                        <Typography align={'center'} size={24} weight={700}>Участие подтверждено ✅</Typography>
                    </Block>
                    <Block isAlignCenter={true} bottom={40}>
                        <Typography align={'center'} size={18} weight={500} bottom={10}>Ухты, это уже твое {attendeeResponse?.attendees_count.length} участие.</Typography>
                        <Typography align={'center'} size={18} weight={500}> Спасибо за вовлеченность 🤗</Typography>
                    </Block>
                    <Block>
                        <Button onClick={() => navigate('/')} isBgLight={true} bottom={10}>На главную</Button>
                    </Block>
                </Modal>
                <MyConfetti />
            </>}

            {attendeeResponse?.status === 'Already attend' && <Modal minWidth={340} maxWidth={600}>
                <Block isAlignCenter={true} bottom={20}>
                    <Typography align={'center'} size={24} weight={700}>Упс 🙊</Typography>
                </Block>
                <Block isAlignCenter={true} bottom={40}>
                    <Typography align={'center'} size={18} weight={500} bottom={10}>Похоже вы уже подтвердили свое участие в текущей комнате.</Typography>
                    <Typography align={'center'} size={18} weight={500}>Если произошла ошибка, то свяжитесь в телеграм @mitxp (Ayan)</Typography>
                </Block>
                <Block>
                    <Button onClick={() => navigate('/')} isBgLight={true} bottom={10}>На главную</Button>
                </Block>
            </Modal>}

            CHECK ATTENDEE
        </AppContainer>
    </>)
}