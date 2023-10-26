const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const VerfCodes = sequelize.define('verfcode', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false},
    code: {type: DataTypes.STRING, allowNull: false},
    isActive: {type: DataTypes.BOOLEAN, defaultValue: true}
})

const Token = sequelize.define('token', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.TEXT, allowNull: false},
})

const User = sequelize.define('user', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    tg_id: {type: DataTypes.STRING, unique: true},
    tg_chat_id: {type: DataTypes.STRING, unique: true},
    tg_confirmed: {type: DataTypes.DATE},
    email_confirmed: {type: DataTypes.DATE},
    password: {type: DataTypes.STRING}, // для 2х факторки в будущем
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Room = sequelize.define('room', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    tg_group_id: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    roomHash: {type: DataTypes.TEXT, allowNull: false},
    end_date: {type: DataTypes.DATE},
})

const Offer = sequelize.define('offer', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.TEXT, allowNull: false},
    total_scores: {type: DataTypes.INTEGER, defaultValue: 0},
    status: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING},
    end_date: {type: DataTypes.DATE},
})

const Vote = sequelize.define('vote', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    score: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    status: {type: DataTypes.STRING},
    end_date: {type: DataTypes.DATE},
})

const Level = sequelize.define('level', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
    min_points: {type: DataTypes.INTEGER},
    level_score: {type: DataTypes.INTEGER, defaultValue: 1},
})

const Attendee = sequelize.define('attendee', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Qrcode = sequelize.define('qrcode', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    hash : {type: DataTypes.TEXT},
    status : {type: DataTypes.STRING},
})

User.hasMany(Offer);
Offer.belongsTo(User);
Room.hasMany(Offer);
Offer.belongsTo(Room);
User.hasMany(Room);
Room.belongsTo(User);

User.hasMany(Vote);
Vote.belongsTo(User);
Room.hasMany(Vote);
Vote.belongsTo(Room);

Level.hasMany(Vote);
Vote.belongsTo(Level);
Level.hasMany(User);
User.belongsTo(Level);

User.hasMany(Attendee);
Attendee.belongsTo(User);
Room.hasMany(Attendee);
Attendee.belongsTo(Room);

Room.hasMany(Qrcode);
Qrcode.belongsTo(Room);

Offer.hasMany(Vote);
Vote.belongsTo(Offer);

User.hasMany(Token)
Token.belongsTo(User)


module.exports = {
    User,
    Room,
    Offer,
    Vote,
    Qrcode,
    Attendee,
    VerfCodes,
    Token,
    Level
}