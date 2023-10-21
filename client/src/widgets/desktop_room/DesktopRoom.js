import React, {useEffect} from "react";
import Block from "../../shared/ui/block/Block";
import VoteTimer from "../vote_timer/VoteTimer";
import CreateBook from "../../features/create_book/CreateBook";
import BookOffers from "../book_offers/BookOffers";
import VoteViewSettingsModal from "../../features/vote_settings/VoteViewSettingsModal";
import VoteViewSettingButton from "../vote_view_setting_button/VoteViewSettingButton";

export default function DesktopRoom({roomData, roomHash, offers=[]}) {


    return (<>
        <Block>
            <VoteTimer data={roomData} />
        </Block>

        <Block isAlignCenter={true} bottom={30}>
            <Block maxWidth={600} isAlignCenter={true}>
                <VoteViewSettingButton variant={'desktop'} />
                <CreateBook roomHash={roomHash} />
            </Block>
        </Block>

        <Block maxWidth={'100%'} isAlignCenter={true}>
            <BookOffers offers={offers} roomHash={roomHash}/>
        </Block>
    </>)
}