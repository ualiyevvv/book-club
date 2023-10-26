// в чем разница между export и exports ??
module.exports = class OfferDto {
    id;
    info;
    total_scores;
    status;
    comment;
    roomId;
    userId;
    votes;
    createdAt;

    constructor(model) {
        this.id = model.id;
        this.info = model.info;
        this.total_scores = model.total_scores;
        this.comment = model.comment;
        this.roomId = model.roomId;
        this.userId = model.userId;
        this.votes = model.votes;
        this.createdAt = model.createdAt;
    }
}