// в чем разница между export и exports ??
module.exports = class QrcodeDto {
    hash;
    status;
    roomId;
    createdAt;

    constructor(model) {
        this.hash = model.hash;
        this.status = model.status;
        this.roomId = model.roomId;
        this.createdAt = model.createdAt;
    }
}