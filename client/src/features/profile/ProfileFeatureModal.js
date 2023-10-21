import React from "react";
import Modal from "../../shared/ui/modal/Modal";
import ProfileFeature from "./ProfileFeature";

export default function ProfileFeatureModal({user={}, toggle=f=>f}) {


    return (<Modal minWidth={340} maxWidth={600} onClose={toggle}>
        <ProfileFeature user={user} />
    </Modal>)
}