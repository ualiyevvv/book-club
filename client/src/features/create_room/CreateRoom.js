import React, {useContext, useEffect, useState} from "react";

import Input from "../../shared/ui/input/Input";
import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
import {useAuth} from "../../app/AuthProvider";
const CreateRoom = ({onChosenBook=f=>f}) => {


    const [roomName, setRoomName] = useState('')
    const [roomEndDate, setRoomEndDate] = useState('')
    const [roomTgGroupId, setTgGroupId] = useState('')
    const [roomAuthor, setAuthor] = useState(null)

    const {user} = useAuth()
    function createRoom() {

        const room = {
            name: roomName,
            tg_group_id: roomTgGroupId,
            user_id: user.id,
            end_date: roomEndDate
        }

        // Отправка POST-запроса
        fetch(`http://localhost:3000/api/room/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Произошла ошибка при отправке запроса');
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch(error => {
                console.error(error);
            });
    }


    return (<>
        <Block isAlignCenter={true} bottom={15}>
            <Input type={'text'} value={roomName} placeHolder={'room name'} name={'name'} onChange={(e) => setRoomName(e.target.value)} />
            <Input type={'date'} value={roomEndDate} placeHolder={'room end date'} name={'end_date'} onChange={(e) => setRoomEndDate(e.target.value)} />
            <Input type={'text'} value={roomTgGroupId} placeHolder={'room tg id'} name={'tg_group_id'} onChange={(e) => setTgGroupId(e.target.value)} />
            <Button onClick={createRoom}>Create a room</Button>
        </Block>
    </>)
}

export default CreateRoom;
