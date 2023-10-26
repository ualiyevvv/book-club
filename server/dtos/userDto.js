// в чем разница между export и exports ??
module.exports = class UserDto {
    id;
    name;
    email;
    tg_startHash;
    tg_confirmed;
    email_confirmed;
    role;
    level_id;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
        this.tg_confirmed = model.tg_confirmed
        this.tg_startHash = model.password;
        // this.email_confirmed = model.email_confirmed;
        this.role = model.role;
        this.level_id = model.level_id;
    }
}