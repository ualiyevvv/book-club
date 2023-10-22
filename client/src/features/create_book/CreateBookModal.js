import React from 'react'
import CreatBookForm from "../book/CreatBookForm";
import Modal from "../../shared/ui/modal/Modal";
import {useAuth} from "../../app/AuthProvider";
import useToggle from "../../hooks/useToggle";
import TelegramAttach from "../telegram_attach/TelegramAttach";
import {useNavigate} from "react-router-dom";

export default function CreateBookModal({toggle, roomHash}) {

    const {isAuth, user} = useAuth();

    if (isAuth && !user.tg_confirmed) {

        return (<Modal minWidth={340} maxWidth={480} height={'80%'} onClose={toggle}>
            <TelegramAttach tg_startHash={user.tg_startHash} onClose={toggle} />
        </Modal>)
    }

    return (<Modal minWidth={340} maxWidth={480} height={'80%'} onClose={toggle}>
        <CreatBookForm roomHash={roomHash} setIsBookOffering={toggle} />
    </Modal>)
}