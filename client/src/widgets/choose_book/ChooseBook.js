import React, {useEffect, useState} from "react";

import styles from './ChooseBook.module.css'
import Typography from "../../shared/ui/typography/Typography";
import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Badge from "../../shared/ui/badge/Badge";
import Link from "../../shared/ui/link/Link";
import useToggle from "../../hooks/useToggle";
import BookInfo from "../../features/book/BookInfo";
import Loading from "../../shared/loading/Loading";
export default function ChooseBook({voteViewSettingValue, item}) {

    useEffect(() => {
        console.log('CHOOOSEE VOOTE', item)
    }, []);


    const [isActive, toggle] = useToggle(false);
    const [isLoading, setIsLoading] = useState(false)

    function sendVote() {
        setIsLoading(true)
        // Отправка POST-запроса
        fetch(`http://localhost:3000/api/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Произошла ошибка при отправке запроса');
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
                item = data
                // onChosenBook(bookOfferObjForSend)
                // setBookOffer(null)
                // setSearchTerm('')
                // setSearchResults([])
                // setIsBookOffering(false)
            })
            .catch(error => {
                console.error(error);
            });
        setIsLoading(false)
    }

    return (<>

        { isActive && <BookInfo item={item} onClose={toggle}/> }
        {isLoading && <Loading />}

        <div className={styles['ChooseBook']}>
            <div className={styles['ChooseBook__row']}>
                <div className={styles['ChooseBook__user']}>
                    {/*<div className="author__avatar"></div>*/}
                    <div className={styles['user__name']}>
                        <strong>Ayan Ualiyev </strong>
                        <span>предложил книгу {item.createdAt}</span>
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
            <Button badge={true} size={'small'} variant={'outline'} onClick={sendVote}>
                Проголосовать
                {voteViewSettingValue == 1 && <Badge top={-15}  air={true} text={'Голосов ' + item.votes_count} />}
            </Button>
        </div>
    </>)
}
