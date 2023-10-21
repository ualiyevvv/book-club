import {useState} from 'react'

export default function useVote() {

    const [offerAsSent, setOfferAsSent] = useState(null)
    const [isVoteLoading, setIsVoteLoading] = useState(false)


    async function sendVote(offerId, roomHash, userId) {
        // <CreateVote />
        const voteForSendObj = {
            roomHash,
            userId,
            offerId
        }

        setIsVoteLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' :`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(voteForSendObj),
            });

            return await response.json()

        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setIsVoteLoading(false)
        }

    }

    return ({
        isVoteLoading,
        sendVote,
        offerAsSent,
    })
}