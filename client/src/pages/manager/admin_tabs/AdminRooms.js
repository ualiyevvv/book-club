import React, {useEffect, useState} from "react";
import {useAuth} from "../../../app/AuthProvider";
import Overlay from "../../../shared/ui/overlay/Overlay";
import Loader from "../../../shared/ui/loader/Loader";
import Table from "../../../shared/ui/table/Table";
import TableHead from "../../../shared/ui/table/TableHead";
import TableRow from "../../../shared/ui/table/TableRow";
import TableBody from "../../../shared/ui/table/TableBody";
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import Button from "../../../shared/ui/button/Button";
import useToggle from "../../../hooks/useToggle";
import CreateRoomModal from "../../../features/admin/create_room/CreateRoomModal";
import GetQrModal from "../../../features/admin/get_qr/GetQrModal";

export default function AdminRooms() {

    const {roomHandler} = useAuth();
    const {rooms, isLoading, getRooms} = roomHandler
    const [roomHashForModal, setRoomHashForModal] = useState(null)

    useEffect(() => {
        getRooms()
    }, []);

    const [isCreateRoomModalActive, toggle] = useToggle()
    const [isQrModalActive, toggleQr] = useToggle()

    if (isLoading) {
        return <Overlay><Loader /></Overlay>
    }

    function onGetQr(roomHash) {
        setRoomHashForModal(roomHash)
        toggleQr()
    }

    return (<>
        {isCreateRoomModalActive && <CreateRoomModal toggle={toggle}/> }
        {isQrModalActive && <GetQrModal roomHash={roomHashForModal} toggle={toggleQr}/> }
        <Button width={'fit-content'} onClick={toggle} size={'small'} bottom={20}>Создать комнату</Button>
        {rooms.length < 1 && 'No rooms in system.'}
        {rooms.length > 0 &&
            <Table>
                <TableHead>
                    <TableRow isHead={true}>id</TableRow>
                    <TableRow isHead={true}>name</TableRow>
                    <TableRow isHead={true}>tg_group_id</TableRow>
                    <TableRow isHead={true}>status</TableRow>
                    <TableRow isHead={true}>roomHash</TableRow>
                    <TableRow isHead={true}>end_date</TableRow>
                    <TableRow isHead={true}>createdAt</TableRow>
                    <TableRow isHead={true}>userId</TableRow>
                    <TableRow isHead={true}>QR</TableRow>
                </TableHead>
                <TableBody Loader={<Loader color={'black'}/>}>
                    { rooms.map( room => (<>
                        <TableRow key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <td>{room.tg_group_id}</td>
                            <td>{room.status}</td>
                            <td>{room.roomHash}</td>
                            <td>{room.end_date ? format(new Date(room.end_date), 'dd MMMM yyyy, HH:mm', {locale: ruLocale}) : 'NULL'}</td>
                            <td>{room.createdAt ? format(new Date(room.createdAt), 'dd MMMM yyyy, HH:mm', {locale: ruLocale}) : 'NULL'}</td>
                            <td>{room.userId}</td>
                            <td><Button onClick={() => onGetQr(room.roomHash)} size={'small'} variant={'outline'}>Get QR</Button></td>
                        </TableRow>
                    </>))}
                </TableBody>
            </Table>
        }

    </>)
}