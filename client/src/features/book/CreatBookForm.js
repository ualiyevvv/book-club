import React, {useEffect, useState} from "react";
import styles from "./CreateBook.module.css";
import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
import Input from "../../shared/ui/input/Input";
import Typography from "../../shared/ui/typography/Typography";
import TelegramAttachModal from "../telegram_attach/TelegramAttachModal";
import {useAuth} from "../../app/AuthProvider";

export default function CreatBookForm({roomHash=null, setIsBookOffering=f=>f}) {

    const {user, offerHandler} = useAuth()
    const {getOffersByRoomHash} = offerHandler
    // TODO !!!!! for searchResults если ничего не найдено обработать ошибку
    const [isLoading, setIsLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const delay = 500; // Adjust the debounce delay in milliseconds
    const [totalSearchItems, setTotalSearchItems] = useState(null);

    const [bookOffer, setBookOffer] = useState(null);
    const [bookOfferComment, setBookOfferComment] = useState('');


    let abortController = new AbortController();
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

    const debouncedSearch = debounce(search, 300); // Создаем дебаунсированную версию функции search

    useEffect(() => {
        console.log(searchTerm);

        // Отменяем предыдущий запрос
        abortController.abort();

        abortController = new AbortController();

        if (searchTerm) {
            // Вызываем дебаунсированную функцию
            debouncedSearch(searchTerm);
        }

        // Очищаем AbortController при размонтировании компонента
        return () => {
            abortController.abort();
        };
    }, [searchTerm]);

    async function search(term) {
        // Отменяем предыдущий запрос перед новым
        // abortController.abort();

        // Здесь ваша логика поиска
        setIsLoading(true);
        setSearchResults([])
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=40&q=${term}`, {
                signal: abortController.signal
            });

            const result = await response.json();
            console.log(result);
            setTotalSearchItems(result.totalItems);

            const items = result.items;
            const bookSearchResultItems = [];

            items.forEach((item) => {
                if (item.volumeInfo.imageLinks) {
                    const img = {
                        src: item.volumeInfo.imageLinks.thumbnail,
                        alt: item.volumeInfo.title,
                    };
                    const bookSearchResultObj = {
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors?.length > 0 ? [...item.volumeInfo.authors] : [],
                        description: item.volumeInfo.description,
                        img,
                        pageCount: item.volumeInfo.pageCount
                    };
                    bookSearchResultItems.push(bookSearchResultObj);
                }
            });

            setSearchResults(bookSearchResultItems);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }

        setIsLoading(false);
    }

    const scrollToTop = () => {
        const scrollContainer = document.getElementById('scroll-container')
        scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth', // Добавляем плавную анимацию прокрутки
        });
    };

    async function sendBookOffer(item) {
        // console.log('ROOM HASH', roomHash)
        const bookOfferObjForSend = {
            info: JSON.stringify(item),
            comment: bookOfferComment,
            user_id: user.id,
            roomHash: roomHash,
        };

        // Отправка POST-запроса
        await fetch(`http://localhost:3000/api/offer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${localStorage.getItem('token')}`
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
                setBookOffer(null)
                setSearchTerm('')
                setSearchResults([])
                setIsBookOffering(false)
                getOffersByRoomHash(roomHash)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (<>
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
                    onChange={(e) => setSearchTerm(e.target.value)}
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
    </>)
}