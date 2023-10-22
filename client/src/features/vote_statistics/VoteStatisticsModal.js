import React from "react";
import Modal from "../../shared/ui/modal/Modal";
import VoteStatistics from "./VoteStatistics";

export default function VoteStatisticsModal({toggle, offers}) {

    return(<Modal minWidth={340} height={'80%'} maxWidth={450} onClose={toggle}>
        <VoteStatistics offers={offers} />
    </Modal>)

}