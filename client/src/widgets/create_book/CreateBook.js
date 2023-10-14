import React, {useEffect, useState} from "react";

import styles from './CreateBook.module.css'
import Input from "../../shared/ui/input/Input";
import Typography from "../../shared/ui/typography/Typography";
import {json} from "react-router-dom";
import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
export default function CreateBook({onChosenBook=f=>f, roomId = null}) {

    const [isLoading, setIsLoading] = useState(false);

    const [isBookOffering, setIsBookOffering] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const delay = 300; // Adjust the debounce delay in milliseconds
    const [totalSearchItems, setTotalSearchItems] = useState(null);

    const [bookOffer, setBookOffer] = useState(null);
    const [bookOfferComment, setBookOfferComment] = useState('');

    const debounce = (func, wait) => {
        let timeoutId;

        return function () {
            const context = this;
            const args = arguments;

            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    };

    // Create a debounced version of your search function
    const debouncedSearch = debounce(search, delay);

    function handleInputChange(event) {
        const newSearchTerm = event.target.value;
        // setIsLoading(true)
        setSearchTerm(newSearchTerm);
        // setIsLoading(false)

        // Call the debounced search function with the updated input value
        debouncedSearch(newSearchTerm);
        // console.log(searchResults)
    }

    // TODO сделать лоадер при поиске книг
    // useEffect(() => {
    //     console.log(isLoading)
    // }, [isLoading])

    function search(term) {
        // Replace this with your actual search logic
        // For example, you can make an API request here
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}`)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result)
                setTotalSearchItems(result.totalItems)
                const items = result.items;
                const bookSearchResultItems = [];

                items.forEach((item) => {
                    if (item.volumeInfo.imageLinks) {
                        const img = {
                            src: item.volumeInfo.imageLinks.smallThumbnail,
                            alt: item.volumeInfo.title,
                        };
                        const bookSearchResultObj = {
                            title: item.volumeInfo.title,
                            authors: (item.volumeInfo.authors?.length > 0) ? [...item.volumeInfo.authors] : [] ,
                            description: item.volumeInfo.description,
                            img,
                        };
                        bookSearchResultItems.push(bookSearchResultObj);
                    }
                }); // Closing parenthesis for forEach

                setSearchResults(bookSearchResultItems);
            })
            .catch((error) => {
                // console.error('Ошибка при загрузке данных:', error);
            });
        // console.log('Searching for:', term);
        // // Simulating search results
        // setSearchResults([`Result 1 for "${term}"`, `Result 2 for "${term}"`]);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Добавляем плавную анимацию прокрутки
        });
    };

    function sendBookOffer(item) {
        const bookOfferObjForSend = {
            info: JSON.stringify(item),
            comment: bookOfferComment,
            user_id: null,
            room_id: roomId,
        };

        // Отправка POST-запроса
        fetch(`http://localhost:3000/api/offer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookOfferObjForSend),
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Произошла ошибка при отправке запроса');
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);

                onChosenBook(bookOfferObjForSend)
                setBookOffer(null)
                setSearchTerm('')
                setSearchResults([])
                setIsBookOffering(false)
            })
            .catch(error => {
                console.error(error);
            });
    }



    // TO DO !!!!! for searchResults если ничего не найдено обработать ошибку

    return (<>
        <Block isAlignCenter={true} bottom={15}>
            {isBookOffering
                ? <Button size={'small'} width={'fit-content'} variant={'outline'} onClick={() => setIsBookOffering(false)}>Отменить</Button>
                : <Button size={'small'} width={'fit-content'} onClick={() => setIsBookOffering(true)}>Предложить книгу</Button>
            }
        </Block>

        {isBookOffering &&
            <div className={styles['CreateBook']}>

                <div className={styles['CreateBook__steps']}>
                    <div className={styles['CreateBook__statusbar']}>
                        <div className={`${styles['CreateBook__statusbar_item']} ${!bookOffer && styles['CreateBook__statusbar_item--active']}`}>
                            1
                        </div>
                        <div className={`${styles['CreateBook__statusbar_item']} ${bookOffer && styles['CreateBook__statusbar_item--active']}`}>
                            2
                        </div>
                    </div>
                    <div className={styles['CreateBook__status_descr']}>
                        {!bookOffer && 'Найдите и выберите книгу'}
                        {bookOffer && 'Напишите свой комментарий, чтобы привлечь внимание к книге'}
                    </div>
                </div>

                {bookOffer && <>
                    <Block bottom={20}>
                        <div className={styles['CreateBook__book']}>
                            <div className={styles['CreateBook__book__cover']}>
                                <img src={bookOffer?.img?.src} alt={bookOffer?.img?.alt} />
                            </div>
                            <div className={styles['CreateBook__book__info']}>
                                <div className={styles['CreateBook__book__title']}>
                                    {bookOffer?.title}
                                </div>
                                <div className={styles['CreateBook__book__author']}>
                                    {bookOffer?.authors?.map(author => (<span>{author}, </span>) )}
                                </div>
                            </div>
                        </div>
                        <Button size={'small'} variant={'outline'} onClick={() => { setBookOffer(null);scrollToTop(); }}>Поменять выбор</Button>
                    </Block>
                    <Input
                        type="text"
                        value={bookOfferComment}
                        onChange={(e) => setBookOfferComment(e.target.value)}
                        placeHolder={'Введите комментарий'}
                    />
                    <Button size={'small'} onClick={() => sendBookOffer(bookOffer)}>{bookOfferComment ? 'Опубликовать' : 'Пропустить и опубликовать'}</Button>
                </>}
                {!bookOffer && <>
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeHolder={'Введите название'}
                    />
                    {searchResults.length > 0 && <Typography size={12} color={'grey'} weight={500} bottom={10}>Отображено {searchResults.length} из {totalSearchItems} книг. Выберите из списка или уточните запрос.</Typography>}

                    <ul>
                        {isLoading && 'Загрузка...'}
                        {searchResults.length > 0 && searchResults?.map((item, index ) => (
                            <div className={styles['CreateBook__book__wrapper']} key={index}>
                                <div className={styles['CreateBook__book']} key={index}>
                                    <div className={styles['CreateBook__book__cover']}>
                                        <img src={item?.img?.src} alt={item?.img?.alt} />
                                    </div>
                                    <div className={styles['CreateBook__book__info']}>
                                        <div className={styles['CreateBook__book__title']}>
                                            {item?.title}
                                        </div>
                                        <div className={styles['CreateBook__book__author']}>
                                            {item?.authors?.map(author => (<span>{author}, </span>) )}
                                        </div>
                                        <div className={styles['CreateBook__book__descr']}>
                                            {item?.description}
                                        </div>
                                    </div>
                                </div>
                                <Button size={'small'} variant={'outline'} onClick={() => { setBookOffer(item);scrollToTop(); }}>Выбрать</Button>
                            </div>
                        ))}
                    </ul>
                </>}
                {/*<Typography size={16} weight={500} color={'grey'}></Typography>*/}
            </div>
        }

    </>)
}
