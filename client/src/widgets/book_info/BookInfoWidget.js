import React from "react";
import ToggleButtonWrapper from "../../shared/ui/toggle_button/ToggleButtonWrapper";
import ToggleButton from "../../shared/ui/toggle_button/ToggleButton";
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";

export default function BookInfoWidget({book}) {



    return (<>
        <ToggleButtonWrapper>
            <ToggleButton isActive={true}>О книге</ToggleButton>
            <ToggleButton isActive={false}>Логи</ToggleButton>
            <ToggleButton isActive={false}>Комментарии</ToggleButton>
        </ToggleButtonWrapper>
        <Block isAlignCenter={true}>
            <Block bottom={20} isAlignCenter={true}>
                <Typography align={'center'} weight={700} size={21} bottom={8}>{book.info.title}</Typography>
                <Typography align={'center'} weight={500} color={'grey'} size={16}>{book.info.authors.map(author => { return <span>{author} </span>})}</Typography>
            </Block>

            <Block bottom={20} maxWidth={200} isAlignCenter={true}>
                <img src={book.info.img.src} alt={book.info.img.alt} />
            </Block>

            <Block>
                {book.info.description}
            </Block>
        </Block>
    </>)
}