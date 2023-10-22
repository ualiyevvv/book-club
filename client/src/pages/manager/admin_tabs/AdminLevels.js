import React, {useEffect} from "react";
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
import CreateLevelModal from "../../../features/admin/create_level/CreateLevelModal";

export default function AdminLevels() {

    const {adminHandler} = useAuth();
    const {levels, isLoading, getLevels, createLevel} = adminHandler

    useEffect(() => {
        getLevels()
    }, []);

    const [isCreateLevelModalActive, toggle] = useToggle()

    if (isLoading) {
        return <Overlay><Loader /></Overlay>
    }

    return (<>
        {isCreateLevelModalActive && <CreateLevelModal toggle={toggle}/> }
        <Button width={'fit-content'} onClick={toggle} size={'small'} bottom={20}>Создать level</Button>
        {levels.length < 1 && 'No levels in system.'}
        {levels.length > 0 &&
            <Table>
                <TableHead>
                    <TableRow isHead={true}>id</TableRow>
                    <TableRow isHead={true}>name</TableRow>
                    <TableRow isHead={true}>description</TableRow>
                    <TableRow isHead={true}>min_points</TableRow>
                    <TableRow isHead={true}>level_score</TableRow>
                </TableHead>
                <TableBody Loader={<Loader color={'black'}/>}>
                    { levels.map( level => (<>
                        <TableRow key={level.id}>
                            <td>{level.id}</td>
                            <td>{level.name}</td>
                            <td>{level.description}</td>
                            <td>{level.min_points}</td>
                            <td>{level.level_score}</td>
                        </TableRow>
                    </>))}
                </TableBody>
            </Table>
        }

    </>)
}