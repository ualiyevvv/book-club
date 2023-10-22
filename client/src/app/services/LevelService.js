import $api from "../http";

export default class LevelService {

    static async createLevel(name,description,min_points,level_score) {
        return $api.post('/level', {name,description,min_points,level_score});
    }
    static async getLevels() {
        return $api.get('/level');
    }
    static async getLevel(levelId) {
        return $api.get(`/level/${levelId}`);
    }
}