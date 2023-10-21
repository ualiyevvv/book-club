import React, {useState} from "react";
import RoomService from "../services/RoomService";
import OfferService from "../services/OfferService";

export default function useOffer() {

    const [isOffersLoading, setIsOffersLoading] = useState(false);
    const [offers, setOffers] = useState([]);
    const [offersIsLoaded, setOffersIsLoaded] = useState(false);
    const [currentOffer, setCurrentOffer] = useState(null);

    async function getOffersByRoomHash(roomHash) {
        setIsOffersLoading(true)
        setOffersIsLoaded(false)
        try {
            const response = await OfferService.getOffers(roomHash)
            const data = response.data.offers

            const strinfiedBooks = []
            if (data.length > 0) {
                data.map(book => {
                    const newBook = {...book, info: JSON.parse(book.info)}
                    // console.log('NEWEW BOOK', newBook)
                    strinfiedBooks.push(newBook);
                })
            }
            setOffers(strinfiedBooks)

        } catch (e) {
            console.log(e.response?.data?.message);
            // setError(e.response?.data?.message)
        } finally {
            setIsOffersLoading(false)
            setOffersIsLoaded(true)
        }
    }


    return {
        currentOffer,
        setCurrentOffer,
        // offersIsLoaded, setOffersIsLoaded,
        // setOffers,
        isOffersLoading,
        offers,
        getOffersByRoomHash,
        offersIsLoaded
    }
}