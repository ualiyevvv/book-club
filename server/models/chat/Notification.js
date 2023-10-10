const {Schema, model} = require('mongoose');


const NotificationSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['message'],
            default: 'message'
        },
        message: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            required: true,
        },
        conversation: {
            type: Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        strict: true,
    }
);


NotificationSchema.plugin(require('mongoose-unique-validator'));
NotificationSchema.plugin(require('../log-plugin'));
NotificationSchema.plugin(require('../../websocket/observer/chat/notification-observer'));

/*NotificationSchema.methods.onCreate = async function({body, user}){
    this.user = user.id;
}*/

/*NotificationSchema.statics.deepDeleteById = async function(id){
    const notification = await this.findById(id);
    if(!notification)
        return `Not found notification with id ${id}`;
    return await notification.deepDelete();
}*/

/*NotificationSchema.methods.deepDelete = async function(){
    await this.delete();
    return this;
}*/

module.exports = model('Notification', NotificationSchema);