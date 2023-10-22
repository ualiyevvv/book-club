import React, {useEffect, useState} from "react";
import Block from "../../shared/ui/block/Block";
import VoteTimer from "../vote_timer/VoteTimer";
import CreateBook from "../../features/create_book/CreateBook";
import BookOffers from "../book_offers/BookOffers";
import VoteViewSettingsModal from "../../features/vote_settings/VoteViewSettingsModal";
import VoteViewSettingButton from "../vote_view_setting_button/VoteViewSettingButton";
import VoteStatisticsButton from "../vote_statistics_button/VoteStatisticsButton";

export default function DesktopRoom({roomData, roomHash, offers=[]}) {

    const [isRoomEnd, setIsRoomEnd] = useState(new Date() > new Date(roomData.end_date))

    return (<>
        <Block>
            <VoteTimer isRoomEnd={isRoomEnd} data={roomData} />
        </Block>

        <Block isAlignCenter={true} bottom={30}>
            <Block maxWidth={600} isAlignCenter={true}>
                <VoteStatisticsButton offers={offers} variant={'desktop'}/>
                <VoteViewSettingButton variant={'desktop'} />
                {!isRoomEnd && <CreateBook roomHash={roomHash} />}
            </Block>
        </Block>

        <Block maxWidth={'100%'} isAlignCenter={true}>
            <BookOffers isRoomEnd={isRoomEnd} offers={offers} roomHash={roomHash}/>
        </Block>
    </>)
}