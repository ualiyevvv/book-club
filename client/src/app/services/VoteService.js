import $api from "../http";

export default class VoteService {
    static async getVotes(offerId) {
        return $api.get(`/vote/${offerId}`);
    }
    static async setVote() {
        return $api.post('/vote', {});
    }
}