// в чем разница между export и exports ??
module.exports = class VoteDto {
    id;
    score;
    userId;
    roomId;
    offerId;
    createdAt;

    constructor(model) {
        this.id = model.id;
        this.score = model.score;
        this.userId = model.userId;
        this.roomId = model.roomId;
        this.offerId = model.offerId;
        this.createdAt = model.createdAt;
    }
}