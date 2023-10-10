import React, {useEffect} from "react";

import styles from './ChooseBook.module.css'
import Typography from "../../shared/ui/typography/Typography";
import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Badge from "../../shared/ui/badge/Badge";
import Link from "../../shared/ui/link/Link";
export default function ChooseBook({item}) {

    return (
        <div className={styles['ChooseBook']}>
            <div className={styles['ChooseBook__row']}>
                <div className={styles['ChooseBook__user']}>
                    {/*<div className="author__avatar"></div>*/}
                    <div className={styles['user__name']}>
                        <strong>Ayan Ualiyev </strong>
                        <span>предложил книгу 16 часов 35 минут назад</span>
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
                    <img src={item.book.img.src} alt={item.book.img.alt}/>
                </div>

                <Block>
                    <div className={styles['ChooseBook__title']}>
                        {item?.book?.title}
                    </div>
                    <div className={styles['ChooseBook__author']}>
                        {item?.book?.authors.map(author => (<>{author}, </>))}
                    </div>
                    <Link text={'Узнать подробнее'}></Link>
                </Block>
            </div>
            <Button badge={true} size={'small'} variant={'outline'}>
                Проголосовать
                <Badge top={-15}  air={true} text={'15 голосов'} />
            </Button>
        </div>
    )
}
