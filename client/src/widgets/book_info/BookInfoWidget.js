import React, {useState} from "react";
import ToggleButtonWrapper from "../../shared/ui/toggle_button/ToggleButtonWrapper";
import ToggleButton from "../../shared/ui/toggle_button/ToggleButton";
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import {formatRelative} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export default function BookInfoWidget({book, votes}) {

    const [tab, setTab] = useState('about')

    const tabView = {
        about: <Block isAlignCenter={true}>
            <Block bottom={20} isAlignCenter={true}>
                <Typography align={'center'} weight={700} size={21} bottom={8}>{book.info.title}</Typography>
                <Typography align={'center'} weight={500} color={'grey'} size={16} bottom={8}>{book.info.authors?.map(author => { return <span>{author} </span>})}</Typography>
                {book.info?.pageCount && <Typography align={'center'} weight={500} color={'grey'} size={16}>{book.info.pageCount} страниц</Typography>}
            </Block>

            <Block bottom={20} maxWidth={200} isAlignCenter={true}>
                <img src={book.info.img.src} alt={book.info.img.alt} />
            </Block>

            <Block>
                {book.info.description}
            </Block>
        </Block>,
        votes: <Block isAlignCenter={true} isCenteredByY={true}>
            {votes?.length < 1 && 'Пока нет голосов, будь первым!'}
        </Block>,
        comments: <Block isAlignCenter={true} isCenteredByY={true}>
            <Typography align={'center'} weight={500} size={21} bottom={8}>В разработке</Typography>
        </Block>
    }

    return (<>

        <Block bottom={5}>
            <p>
                <strong>{book?.user?.name} </strong>
                <span style={{color: "grey"}}>предложил {formatRelative(new Date(book.createdAt), new Date(), {locale: ruLocale})}</span>
            </p>
        </Block>

        {book.comment ?
            <Block bottom={20}>
                <p>
                    {book.comment}
                </p>
            </Block> : <Block bottom={15}></Block>
        }

        <ToggleButtonWrapper>
            <ToggleButton isActive={tab === 'about'} onClick={() => setTab('about')}>О книге</ToggleButton>
            <ToggleButton isActive={tab === 'votes'} onClick={() => setTab('votes')}>Голоса</ToggleButton>
            <ToggleButton isActive={tab === 'comments'} onClick={() => setTab('comments')}>Комментарии</ToggleButton>
        </ToggleButtonWrapper>

        {tabView[tab]}

    </>)
}