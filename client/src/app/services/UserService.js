import $api from "../http";

export default class UserService {
    static async getUsers() {
        return $api.get('/user');
    }
}