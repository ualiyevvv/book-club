import React, {useEffect, useState} from "react";
import BooksCounter from "../books_counter/BooksCounter";
import Button from "../../shared/ui/button/Button";
import BookInfoWidget from "../book_info/BookInfoWidget";
import Drawer from "../../shared/ui/drawer/Drawer";
import useVote from "../../app/hooks/useVote";
import {useAuth} from "../../app/AuthProvider";
import Overlay from "../../shared/ui/overlay/Overlay";
import Loader from "../../shared/ui/loader/Loader";

export default function OfferDrawer({roomHash, setIsDrawerActive, isDrawerActive, offer}) {

    const {user} = useAuth()

    const {voteViewSettingValue} = useAuth()
    const {isVoteLoading, sendVote} = useVote()
    const {offerHandler} = useAuth()
    const {getOffersByRoomHash, currentOffer, setCurrentOffer} = offerHandler
    const [isVoteSent, setIsVoteSent] = useState()

    useEffect(() => {
        setIsVoteSent(offer.votes?.find(vote => vote.userId === user.id))
        console.log('OfferDrawer', offer)
    }, [offer]);

    function onSendVote() {
        sendVote(offer.id, roomHash, user.id).then(r => {
            getOffersByRoomHash(roomHash)
            setCurrentOffer(offer)
            // console.log(r)
        })
    }

    return (<>
        {isVoteLoading && <Overlay><Loader/></Overlay>}
        <Drawer
            onClose={setIsDrawerActive}
            isDrawerActive={isDrawerActive}
            Buttons={<>
                { voteViewSettingValue == 1 && <BooksCounter isVote={true} currentCounter={offer.votes?.length} /> }
                {isVoteSent
                    ? <Button width={'100%'} onClick={onSendVote} isBgLight={true}>Отменить голос</Button>
                    : <Button width={'100%'} onClick={onSendVote} isBgLight={true} variant={'yellow'}>Проголосовать ✋</Button>
                }


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