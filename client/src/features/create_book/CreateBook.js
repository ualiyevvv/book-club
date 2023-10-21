import React, {useEffect, useState} from "react";

import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
import CreatBookForm from "../book/CreatBookForm";
import {useAuth} from "../../app/AuthProvider";
import TelegramAttachModal from "../telegram_attach/TelegramAttachModal";
import {useNavigate} from "react-router-dom";
import useToggle from "../../hooks/useToggle";
export default function CreateBook({roomHash = null}) {

    const [isBookOffering, setIsBookOffering] = useState(false)
    const {isAuth, user} = useAuth()
    const navigate = useNavigate();


    const [isModalActive, toggle] = useToggle(false)

    function onOffer() {
        if (!isAuth) {
            navigate('/authn')
        }
        else if (!user.tg_confirmed) {
            toggle()
        } else {
            setIsBookOffering(true)
        }
    }

    return (<>
        {isModalActive && <TelegramAttachModal onClose={toggle} />}
        <Block isAlignCenter={true} bottom={15}>
            {isBookOffering
                ? <Button size={'small'} width={'fit-content'} variant={'outline'} onClick={() => setIsBookOffering(false)}>Отменить</Button>
                : <Button size={'small'} width={'fit-content'} onClick={onOffer}>Предложить книгу</Button>
            }
        </Block>

        {isBookOffering &&
            <CreatBookForm setIsBookOffering={setIsBookOffering} roomHash={roomHash} />
        }

    </>)
}
