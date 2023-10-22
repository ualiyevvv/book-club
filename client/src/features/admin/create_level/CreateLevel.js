import React, {useContext, useEffect, useState} from "react";

import Input from "../../../shared/ui/input/Input";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import {useAuth} from "../../../app/AuthProvider";
import Typography from "../../../shared/ui/typography/Typography";
const CreateLevel = ({toggle}) => {

    const {adminHandler} = useAuth();
    const {createLevel, getLevels} = adminHandler

    const [levelName, setLevelName] = useState('')
    const [levelDescription, setLevelDescription] = useState('')
    const [levelMinPoints, setLevelMinPoints] = useState(0)
    const [levelScore, setLevelScore] = useState(0)

    const {user} = useAuth()

    if (!user) {
        return (<></>)
    }

    // TODO validation custom or change to form and submit (native input requires)
    function onCreateLevel() {
        const level = {
            name: levelName,
            description: levelDescription,
            min_points: levelMinPoints,
            level_score: levelScore
        }

        createLevel(level)
        getLevels()
        toggle()
    }


    return (<>
        <Block isAlignCenter={true} bottom={15}>
            <Typography size={24} weight={600} bottom={20}>Create a level</Typography>
            <Input type={'text'} value={levelName} placeHolder={'level name'} onChange={(e) => setLevelName(e.target.value)} />
            <Input type={'text'} value={levelDescription} placeHolder={'level description'} onChange={(e) => setLevelDescription(e.target.value)} />
            <Input type={'number'} value={levelMinPoints} placeHolder={'level min_points'} onChange={(e) => setLevelMinPoints(e.target.value)} />
            <Input type={'number'} value={levelScore} placeHolder={'level score'} onChange={(e) => setLevelScore(e.target.value)} />
            <Button onClick={onCreateLevel}>Отправить</Button>
        </Block>
    </>)
}

export default CreateLevel;
