import React from "react";
import Modal from "../../shared/ui/modal/Modal";
import SetName from "./SetName";

export default function SetNameModal({}) {


    return (<Modal minWidth={340} maxWidth={600}>
        <SetName />
    </Modal>)
}