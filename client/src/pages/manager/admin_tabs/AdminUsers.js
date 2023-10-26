import React, {useEffect} from "react";
import {useAuth} from "../../../app/AuthProvider";
import Overlay from "../../../shared/ui/overlay/Overlay";
import Loader from "../../../shared/ui/loader/Loader";
import Table from "../../../shared/ui/table/Table";
import TableHead from "../../../shared/ui/table/TableHead";
import TableRow from "../../../shared/ui/table/TableRow";
import TableBody from "../../../shared/ui/table/TableBody";
import Block from "../../../shared/ui/block/Block";
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export default function AdminUsers() {

    const {adminHandler} = useAuth();
    const {users, isLoading,getUsers} = adminHandler;

    useEffect(() => {
        getUsers()
    }, []);

    if (isLoading) {
        return <Overlay><Loader /></Overlay>
    }

    return (<>
        {users.length < 1 && 'No users in system.'}
        {users.length > 0 &&
            <Table>
                <TableHead>
                    <TableRow isHead={true}>id</TableRow>
                    <TableRow isHead={true}>name</TableRow>
                    <TableRow isHead={true}>level</TableRow>
                    <TableRow isHead={true}>email</TableRow>
                    <TableRow isHead={true}>email_confirmed</TableRow>
                    <TableRow isHead={true}>tg_id</TableRow>
                    <TableRow isHead={true}>tg_confirmed</TableRow>
                    <TableRow isHead={true}>role</TableRow>
                </TableHead>
                <TableBody Loader={<Loader color={'black'}/>}>
                    { users.map( user => (<>
                        <TableRow key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.levelId}</td>
                            <td>{user.email}</td>
                            <td>{user.email_confirmed ? format(new Date(user.email_confirmed), 'dd MMMM yyyy, HH:mm', {locale: ruLocale}) : 'NULL'}</td>
                            <td>{user.tg_id}</td>
                            <td>{user.tg_confirmed ? format(new Date(user.tg_confirmed), 'dd MMMM yyyy, HH:mm', {locale: ruLocale}) : 'NULL'}</td>
                            <td>{user.role}</td>
                        </TableRow>
                    </>))}
                </TableBody>
            </Table>
        }

    </>)
}