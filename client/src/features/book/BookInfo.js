import React from "react";
import Modal from "../../shared/ui/modal/Modal";
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import GroupButtons from "../../shared/ui/group_buttons/GroupButtons";
import Button from "../../shared/ui/button/Button";


export default function BookInfo({title='', onClose, item}) {

    function onSubmit() {
        console.log('hotel create submit')
    }

    return(<>
        <Modal minWidth={360} maxWidth={600} onClose={onClose}>
            {/*<Block bottom={20}>*/}
            {/*    <Button variant={'cancel'} size={'small'} onClick={onClose}>закрыть</Button>*/}
            {/*</Block>*/}
            <Block isAlignCenter={true}>
                <Block bottom={20} isAlignCenter={true}>
                    <Typography align={'center'} weight={700} size={21} bottom={8}>{item.info.title}</Typography>
                    <Typography align={'center'} weight={500} color={'grey'} size={16}>{item.info.authors.map(author => { return <span>{author}</span>})}</Typography>
                </Block>

                <Block bottom={20} maxWidth={200} isAlignCenter={true}>
                    <img src={item.info.img.src} alt={item.info.img.alt} />
                </Block>

                <Block>
                    {item.info.description}
                </Block>

                <GroupButtons top={20}>
                    <Button variant={'outline'} width={'100%'} onClick={onClose}>закрыть</Button>
                </GroupButtons>
            </Block>
        </Modal>
    </>)
}