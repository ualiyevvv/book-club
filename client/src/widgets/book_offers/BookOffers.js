import React, {useEffect, useState} from "react";

import styles from './CreateBook.module.css'
import Input from "../../shared/ui/input/Input";
import Typography from "../../shared/ui/typography/Typography";
import {json} from "react-router-dom";
import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
import Grid from "../../shared/ui/grid/Grid";
import ChooseBook from "../choose_book/ChooseBook";
import Container from "../../shared/ui/box/Container";
export default function BookOffers({ voteViewSettingValue, roomHash = null}) {

    const [isLoading, setIsLoading] = useState(false);


    const [books, setBooks] = useState([])
    function getAllOffers() {

        // Отправка GET-запроса
        fetch(`http://localhost:3000/api/offer/${roomHash}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Произошла ошибка при отправке запроса');
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
                setBooks(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAllOffers()
    }, []);


    return (<>
        <Block isAlignCenter={true}>
        <span>
            <Typography align={'center'} size={16} color={'grey'} weight={500}>Предложено книг: </Typography>
            <Typography align={'center'} size={16} color={'black'} weight={500}>{books.length}</Typography>
        </span>
        </Block>

        {books.length > 0 &&
            <Block bottom={10}></Block>
        }
        {books.length < 1 &&
            <Block isAlignCenter={true} bottom={15}>
                <Block bottom={20}></Block>
                <Typography align={'center'} size={21} weight={500} color={'grey'}>Будьте первым! Предложите книгу</Typography>
            </Block>
        }

        <Grid isForBooks={true}>
            {books.map((book, index) => {
                book = {
                    ...book,
                    info: JSON.parse(book.info)
                }
                return (
                    <ChooseBook voteViewSettingValue={voteViewSettingValue} item={book} key={index} />
                )
            })}
        </Grid>
    </>)
}
