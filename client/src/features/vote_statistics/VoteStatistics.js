import React from "react";
import Block from "../../shared/ui/block/Block";
import Typography from "../../shared/ui/typography/Typography";
import Table from "../../shared/ui/table/Table";
import TableHead from "../../shared/ui/table/TableHead";
import TableRow from "../../shared/ui/table/TableRow";
import TableBody from "../../shared/ui/table/TableBody";
import Loader from "../../shared/ui/loader/Loader";

export default function VoteStatistics({title='', onClose, offers}) {


    return(<>
        <Block bottom={30} isAlignCenter={true}>
            <Typography align={'center'} weight={700} size={24}>Статистика</Typography>
        </Block>
        <Block>
            {offers.length < 1 && 'Пока нет проголосовавших. Будьте первым!'}
            {offers.length > 0 &&
                <Table>
                    <TableHead>
                        <TableRow isHead={true}>Книга</TableRow>
                        <TableRow isHead={true}>Баллы</TableRow>
                        <TableRow isHead={true}>Кол-во голосов</TableRow>
                    </TableHead>
                    <TableBody Loader={<Loader color={'black'}/>}>
                        { offers.map( offer => (<>
                            <TableRow key={offer.id}>
                                <td>{offer.info.title}</td>
                                <td>{offer.total_scores}</td>
                                <td>{offer.votes.length}</td>
                            </TableRow>
                        </>))}
                    </TableBody>
                </Table>
            }
        </Block>
    </>)
}