import React, {useEffect, useState} from 'react';

import {useNavigate, useParams} from "react-router-dom";

import './eventPage.css'
import AppContainer from "./AppContainer";
import {useAuth} from "../../app/AuthProvider";
import Loader from "../../shared/ui/loader/Loader";
import Overlay from "../../shared/ui/overlay/Overlay";
import DesktopRoom from "../../widgets/desktop_room/DesktopRoom";
import MobileRoom from "../../widgets/mobile_room/MobileRoom";

const EventPage = () => {

    const { roomHash } = useParams();

    const { user, adaptiveHandler, roomHandler, offerHandler } = useAuth();
    const { device } = adaptiveHandler;

    const {isLoading, roomData, getRoom} = roomHandler
    const {offers, getOffersByRoomHash} = offerHandler;


    useEffect(() => {
        getRoom(roomHash);
        getOffersByRoomHash(roomHash)
    }, []);


    if (isLoading) {
        return (<Overlay><Loader /></Overlay>)
    }

    return (
        <AppContainer>

            <div className="event-page">

                {device === 'desktop'
                    ? <DesktopRoom offers={offers} roomHash={roomHash} roomData={roomData} />
                    : <MobileRoom offers={offers} roomHash={roomHash} roomData={roomData} />
                }

            </div>
        </AppContainer>
    )
}

export default EventPage;
