import React, {useEffect, useState} from "react";

import styles from './ChooseBook.module.css'
import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
import Badge from "../../shared/ui/badge/Badge";
import Link from "../../shared/ui/link/Link";
import useToggle from "../../hooks/useToggle";
import BookInfo from "../../features/book/BookInfo";
import Loading from "../../shared/loading/Loading";
import {formatRelative} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import useVote from "../../app/hooks/useVote";
import Overlay from "../../shared/ui/overlay/Overlay";
import {useAuth} from "../../app/AuthProvider";
import TelegramAttachModal from "../../features/telegram_attach/TelegramAttachModal";
import Modal from "../../shared/ui/modal/Modal";
import TelegramAttach from "../../features/telegram_attach/TelegramAttach";
import {useNavigate} from "react-router-dom";
import VoteList from "../../features/vote_list/VoteList";

export default function ChooseBook({item, roomHash, isRoomEnd}) {

    const navigate = useNavigate();

    useEffect(() => {
        // console.log('CHOOOSEE VOOTE', item)
    }, []);

    const {isAuth, user, voteViewSettingValue, offerHandler} = useAuth();
    const {getOffersByRoomHash, currentOffer, setCurrentOffer} = offerHandler

    const [isActive, toggle] = useToggle(false);
    const [isTgActive, toggleTg] = useToggle(false);
    const [isVotelistActive, toggleVotelist] = useToggle();
    const {isVoteLoading, sendVote} = useVote();
    const [isVoteSent, setIsVoteSent] = useState()

    useEffect(() => {
        setIsVoteSent(item.votes?.find(vote => vote.userId === user?.id))
        // console.log('ChooseBook', item)
    }, [item]);

    function onSendVote() {
        if (!isAuth) {
            navigate('/authn', {replace: true})
        } else if (isAuth && !user.tg_confirmed) {
            toggleTg()
        } else {
            sendVote(item.id, roomHash, user?.id).then(r => {
                getOffersByRoomHash(roomHash)
                // console.log(r)
            })
        }
    }

    return (<>
        {isTgActive && <Modal minWidth={340} maxWidth={480} height={'80%'} onClose={toggleTg}>
            <TelegramAttach tg_startHash={user?.tg_startHash} onClose={toggleTg} />
        </Modal>}
        {isVotelistActive && <Modal minWidth={340} maxWidth={480} height={'80%'} onClose={toggleVotelist}>
            <VoteList votes={item.votes}/>
        </Modal>}
        { isActive && <BookInfo item={item} onClose={toggle}/> }
        {isVoteLoading && <Overlay><Loading /></Overlay>}

        <div className={styles['ChooseBook']}>
            <div className={styles['ChooseBook__row']}>
                <div className={styles['ChooseBook__user']}>
                    {/*<div className="author__avatar"></div>*/}
                    <div className={styles['user__name']}>
                        <strong>{item.user.name} </strong>
                        <span>предложил книгу {formatRelative(new Date(item.createdAt), new Date(), {locale: ruLocale})}</span>
                    </div>
                    {item?.comment &&
                        <div className={styles['user__comment']}>
                            {item?.comment}
                        </div>
                    }
                </div>
            </div>
            <div className={styles['ChooseBook__bookinfo']}>
                <div className={styles['ChooseBook__cover']}>
                    <img src={item.info.img.src} alt={item.info.img.alt}/>
                </div>

                <Block>
                    <div className={styles['ChooseBook__title']}>
                        {item?.info?.title}
                    </div>
                    <div className={styles['ChooseBook__author']}>
                        {item?.info?.authors.map(author => (<>{author}, </>))}
                    </div>
                    <Link text={'Узнать подробнее'} onClick={toggle} />
                </Block>
            </div>
            {isRoomEnd ? <div style={{position: "relative"}}>
                Голосование завершено
                {voteViewSettingValue == 1 && <Badge right={0} bottom={0} air={true} text={'Баллы ' + item.total_scores} />}
            </div> : <>
                <Button badge={true} size={'small'} variant={'outline'} onClick={onSendVote}>

                        {isVoteSent
                            ? 'Отменить голос'
                            : 'Проголосовать ✋'
                        }
                    {voteViewSettingValue == 1 && <Badge top={-15}  air={true} text={'Баллы ' + item.total_scores} />}
                </Button>
            </>}

            {item.votes.length > 0 && <>
                <Block bottom={15}></Block>
                <Block isAlignCenter={true}>
                    <Link text={'Посмотреть список голосов'} onClick={toggleVotelist} />
                </Block>
            </>}
        </div>
    </>)
}
