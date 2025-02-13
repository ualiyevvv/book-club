import React from 'react'
import {useAuth} from "../../../app/AuthProvider";
import Modal from "../../../shared/ui/modal/Modal";
import CreateLevel from "./CreateLevel";
export default function CreateLevelModal({toggle}) {

    const {isAuth, user} = useAuth();

    if (isAuth && user.role !== 'ADMIN') {
        return window.location.replace('/');
    }

    return (<Modal minWidth={340} maxWidth={480} height={'80%'} onClose={toggle}>
        <CreateLevel toggle={toggle}/>
    </Modal>)
}