// в чем разница между export и exports ??
module.exports = class RoomDto {
    roomHash;
    name;
    tg_group_id;
    user_id;
    end_date;

    constructor(model) {
        this.roomHash = model.roomHash;
        this.name = model.name;
        this.tg_group_id = model.tg_group_id;
        this.user_id = model.user_id;
        this.end_date = model.end_date;
    }
}