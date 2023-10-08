import React from "react";
import Modal from "../../../shared/ui/modal/Modal";
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Button from "../../../shared/ui/button/Button";
import Input from "../../../shared/ui/input/Input";
import GroupInput from "../../../shared/ui/group_input/GroupInput";


// import {db, storage} from '../../../firebase/firebase_config'
import {collection, addDoc} from 'firebase/firestore'

export default function EventPublishForm({onClose=f=>f}) {

    // const eventsCollectionRef = collection(db, 'events');
    const createEvent = async () => {
    //     await addDoc(eventsCollectionRef, {});
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        // const storageRef = storage.ref();
        // const fileRef = storageRef.child(file.name);
        //
        // fileRef.put(file)
        //     .then(() => {
        //         console.log('File uploaded successfully!');
        //     })
        //     .catch((error) => {
        //         console.error('Error uploading file:', error);
        //     });
    };

    return(<>
        <Modal minWidth={360} maxWidth={900} onClose={onClose}>
            <form>
                <Block isAlignCenter={true}>
                    <Typography size={21} weight={600} bottom={20}>Опубликовать мероприятие</Typography>
                </Block>
                <Block>
                    <Input
                        type={'text'}
                        name={'title'}
                        value={''}
                        placeHolder={'Название'}
                        onChange={f=>f}
                        // required
                    />
                    <Input
                        type={'text'}
                        name={'title'}
                        value={''}
                        placeHolder={'Адрес'}
                        onChange={f=>f}
                        // required
                    />
                    <Input
                        type={'text'}
                        name={'title'}
                        value={''}
                        placeHolder={'Категории'}
                        onChange={f=>f}
                        // required
                    />
                    <GroupInput>
                        <Input
                            type={'date'}
                            name={'title'}
                            value={''}
                            placeHolder={'Дата начала'}
                            onChange={f=>f}
                            // required
                        />
                        <Input
                            type={'date'}
                            name={'title'}
                            value={''}
                            placeHolder={'Дата конца'}
                            onChange={f=>f}
                            // required
                        />
                    </GroupInput>
                    <Input
                        type={'text'}
                        name={'title'}
                        value={''}
                        placeHolder={'Описание'}
                        onChange={f=>f}
                        // required
                    />
                    <Input
                        type={'text'}
                        name={'title'}
                        value={''}
                        placeHolder={'Ссылка на регистрацию'}
                        onChange={f=>f}
                        // required
                    />
                    <Input
                        type={'text'}
                        name={'title'}
                        value={''}
                        placeHolder={'Стоимость'}
                        onChange={f=>f}
                        // required
                    />
                    <Input
                        type={'file'}
                        name={'title'}
                        value={''}
                        placeHolder={'Фотографии'}
                        onChange={handleFileUpload}
                        required
                    />
                </Block>

                <GroupButtons top={20}>
                    <Button onClick={f=>f}>Отправить</Button>
                    <Button variant={'cancel'} onClick={onClose}>Отмена</Button>
                </GroupButtons>
            </form>
        </Modal>
    </>)
}