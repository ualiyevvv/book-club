import React, {useEffect, useState} from "react";
import BooksCounter from "../books_counter/BooksCounter";
import Button from "../../shared/ui/button/Button";
import BookInfoWidget from "../book_info/BookInfoWidget";
import Drawer from "../../shared/ui/drawer/Drawer";
import useVote from "../../app/hooks/useVote";
import {useAuth} from "../../app/AuthProvider";
import Overlay from "../../shared/ui/overlay/Overlay";
import Loader from "../../shared/ui/loader/Loader";
import {useNavigate} from "react-router-dom";
import Modal from "../../shared/ui/modal/Modal";
import TelegramAttach from "../../features/telegram_attach/TelegramAttach";
import useToggle from "../../hooks/useToggle";

export default function OfferDrawer({roomHash, setIsDrawerActive, isDrawerActive, offer, isRoomEnd}) {

    const navigate = useNavigate();
    const {isAuth, user} = useAuth()

    const {voteViewSettingValue} = useAuth()
    const {isVoteLoading, sendVote} = useVote()
    const {offerHandler} = useAuth()
    const {getOffersByRoomHash, currentOffer, setCurrentOffer} = offerHandler
    const [isVoteSent, setIsVoteSent] = useState()

    const [isTgAttchModal, toggleTgAttch] = useToggle()

    useEffect(() => {
        setIsVoteSent(offer.votes?.find(vote => vote.userId === user?.id))
        // console.log('OfferDrawer', offer)
    }, [offer]);

    function onSendVote() {
        if (!isAuth) {
            navigate('/authn', {replace: true})
        } else if (isAuth && !user.tg_confirmed) {
            toggleTgAttch()
        } else {
            sendVote(offer.id, roomHash, user?.id).then(r => {
                getOffersByRoomHash(roomHash)
                setCurrentOffer(offer)
                // console.log(r)
            })
        }
    }

    return (<>
        {isTgAttchModal && <Modal minWidth={340} maxWidth={480} height={'80%'} onClose={toggleTgAttch}>
            <TelegramAttach onClose={toggleTgAttch} />
        </Modal>}

        {isVoteLoading && <Overlay><Loader/></Overlay>}
        <Drawer
            onClose={setIsDrawerActive}
            isDrawerActive={isDrawerActive}
            Buttons={<>
                {/*{ voteViewSettingValue == 1 && <BooksCounter isVote={true} currentCounter={offer.votes?.length} /> }*/}
                { voteViewSettingValue == 1 && <BooksCounter isVote={true} currentCounter={offer.total_scores} /> }
                {!isRoomEnd && <>
                    {isVoteSent
                        ? <Button width={'100%'} onClick={onSendVote} isBgLight={true}>Отменить голос</Button>
                        // в проголосовать (+N баллов), но нужно делать запрос на level по user.levelId и получить level_score,
                        // либо в userDto отдавать include level, либо level_score хранить в поле user
                        : <Button width={'100%'} onClick={onSendVote} isBgLight={true} variant={'yellow'}>Проголосовать ✋</Button>
                    }
                </>}

            </>}
        >
            {/*{books.map((book, index) => {*/}
            {/*    return (<>*/}
            {/*        {book.info}*/}
            {/*    </>)*/}
            {/*})}*/}
            <BookInfoWidget book={offer} votes={offer.votes} />

            {/*{books[activeSlide].info}*/}
        </Drawer>
    </>)
}