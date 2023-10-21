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

export default function ChooseBook({item, roomHash}) {

    useEffect(() => {
        console.log('CHOOOSEE VOOTE', item)
    }, []);

    const {isAuth, user, voteViewSettingValue, offerHandler} = useAuth();
    const {getOffersByRoomHash, currentOffer, setCurrentOffer} = offerHandler

    const [isActive, toggle] = useToggle(false);
    const {isVoteLoading, sendVote} = useVote();
    const [isVoteSent, setIsVoteSent] = useState()

    useEffect(() => {
        setIsVoteSent(item.votes?.find(vote => vote.userId === user.id))
        console.log('ChooseBook', item)
    }, [item]);
    
    function onSendVote() {
        if (!isAuth || !user || !user?.tg_confirmed) {
            return (<TelegramAttachModal/>)
        }
        sendVote(item.id, roomHash, user.id).then(r => {
            getOffersByRoomHash(roomHash)
            // console.log(r)
        })
    }

    return (<>

        { isActive && <BookInfo item={item} onClose={toggle}/> }
        {isVoteLoading && <Overlay><Loading /></Overlay>}

        <div className={styles['ChooseBook']}>
            <div className={styles['ChooseBook__row']}>
                <div className={styles['ChooseBook__user']}>
                    {/*<div className="author__avatar"></div>*/}
                    <div className={styles['user__name']}>
                        <strong>{item.user.email} </strong>
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

            <Button badge={true} size={'small'} variant={'outline'} onClick={onSendVote}>

                {isVoteSent
                    ? 'Отменить голос'
                    : 'Проголосовать ✋'
                }
                {voteViewSettingValue == 1 && <Badge top={-15}  air={true} text={'Голосов ' + item.votes_count} />}
            </Button>
        </div>
    </>)
}
