import React, {useEffect, useState} from "react";

import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import Grid from "../../shared/ui/grid/Grid";
import ChooseBook from "../choose_book/ChooseBook";
export default function BookOffers({ isRoomEnd, offers=[], roomHash = null}) {

    return (<>
        <Block isAlignCenter={true}>
        <span>
            <Typography align={'center'} size={16} color={'grey'} weight={500}>Предложено книг: </Typography>
            <Typography align={'center'} size={16} color={'black'} weight={500}>{offers.length}</Typography>
        </span>
        </Block>

        {offers.length > 0 &&
            <Block bottom={10}></Block>
        }
        {offers.length < 1 &&
            <Block isAlignCenter={true} bottom={15}>
                <Block bottom={20}></Block>
                <Typography align={'center'} size={21} weight={500} color={'grey'}>Будьте первым! Предложите книгу</Typography>
            </Block>
        }

        <Grid isForBooks={true}>
            {offers.map((offer, index) => {
                return (
                    <ChooseBook isRoomEnd={isRoomEnd} roomHash={roomHash} item={offer} key={index} />
                )
            })}
        </Grid>
    </>)
}
