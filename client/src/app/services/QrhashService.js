import $api from "../http";

export default class QrhashService {

    static async createQrhash(roomHash) {
        return $api.post('/qrcode', {roomHash});
    }
    static async getQrhash(roomHash) {
        return $api.get(`/qrcode/${roomHash}`);
    }
}