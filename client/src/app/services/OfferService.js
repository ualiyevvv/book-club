import $api from "../http";

export default class OfferService {
    static async getOffers(roomHash) {
        return $api.get(`/offer/${roomHash}`);
    }
    static async createOffer() {
        return $api.post('/offer', {});
    }
    // static async createOffer() {
    //     return $api.post('/offer', {});
    // }
}