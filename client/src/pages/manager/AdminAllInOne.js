import React, {useState} from "react";
import Block from "../../shared/ui/block/Block";
import CreateRoom from "../../features/admin/create_room/CreateRoom";
import {useAuth} from "../../app/AuthProvider";
import ToggleButtonWrapper from "../../shared/ui/toggle_button/ToggleButtonWrapper";
import ToggleButton from "../../shared/ui/toggle_button/ToggleButton";
import AdminUsers from "./admin_tabs/AdminUsers";
import Typography from "../../shared/ui/typography/Typography";
import AdminRooms from "./admin_tabs/AdminRooms";
import AppContainer from "../business_client/AppContainer";
import AdminLevels from "./admin_tabs/AdminLevels";

export default function AdminAllInOne() {

    const { offerHandler, voteHandler, } = useAuth();


    const [tab, setTab] = useState('users')

    const TabsView = {
        users: <AdminUsers />,
        rooms: <AdminRooms />,
        levels: <AdminLevels />,

    }

    return (<>
        <AppContainer isScrollable={true} isNavbar={true}>
            <Block bottom={5}>
                <Block bottom={20} padding={'0 20px'}>
                    <Typography size={28} weight={900} color={'silver'} bottom={20}>Admin Dashboard</Typography>
                    {/*<Typography size={24} weight={600} bottom={12}>Начать</Typography>*/}
                    {/*<GroupButtons>*/}
                    {/*    <Button size={'small'}>Книжный обмен</Button>*/}
                    {/*    <Button size={'small'}>Выбор книги</Button>*/}
                    {/*    <Button size={'small'}>Встречу</Button>*/}
                    {/*</GroupButtons>*/}
                </Block>

                <Block padding={'0 20px'}>
                    <ToggleButtonWrapper>
                        <ToggleButton isActive={tab==='levels'} onClick={() => setTab('levels')}>levels</ToggleButton>
                        <ToggleButton isActive={tab==='users'} onClick={() => setTab('users')}>users</ToggleButton>
                        <ToggleButton isActive={tab==='rooms'} onClick={() => setTab('rooms')}>rooms</ToggleButton>
                        <ToggleButton isActive={tab==='offers'} onClick={() => setTab('offers')}>offers</ToggleButton>
                        <ToggleButton isActive={tab==='votes'} onClick={() => setTab('votes')}>votes</ToggleButton>
                    </ToggleButtonWrapper>
                </Block>
                {/*<CreateRoom />*/}
            </Block>
            <Block padding={20}>
                {TabsView[tab]}
            </Block>
        </AppContainer>
    </>)
}