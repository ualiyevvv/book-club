import React from "react";
import Modal from "../../shared/ui/modal/Modal";
import VoteViewSettings from "./VoteViewSettings";

export default function VoteViewSettingsModal({toggle}) {

    return(<Modal minWidth={340} maxWidth={450} onClose={toggle}>
        <VoteViewSettings title={'Настройте отображение баллов'} onClose={toggle} />
    </Modal>)

}