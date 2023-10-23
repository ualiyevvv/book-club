import $api from "../http";

export default class UserService {
    static async getUsers() {
        return $api.get('/user');
    }

    static async attend(userId, qrHash) {
        return $api.post('/attendee', {userId, qrHash});
    }
}