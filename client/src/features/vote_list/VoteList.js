import React from "react";
import styles from './VoteList.module.css'
import Table from "../../shared/ui/table/Table";
import TableHead from "../../shared/ui/table/TableHead";
import TableRow from "../../shared/ui/table/TableRow";
import TableBody from "../../shared/ui/table/TableBody";
import Loader from "../../shared/ui/loader/Loader";
import {formatRelative} from "date-fns";
import ruLocale from "date-fns/locale/ru";
export default function VoteList({votes=[]}) {


    return (<div className={styles.VoteList}>
        <Table>
            <TableHead>
                <TableRow isHead={true}>User</TableRow>
                <TableRow isHead={true}>Вес</TableRow>
                <TableRow isHead={true}>Дата</TableRow>
            </TableHead>
            <TableBody Loader={<Loader color={'black'}/>}>
                { votes.map( vote => (<>
                    <TableRow key={vote.id}>
                        <td>{vote.user.name}</td>
                        <td>{vote.score}</td>
                        <td>{formatRelative(new Date(vote.createdAt), new Date(), {locale: ruLocale})}</td>
                    </TableRow>
                </>))}
            </TableBody>
        </Table>
    </div>)

}