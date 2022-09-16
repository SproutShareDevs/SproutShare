const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
   // notificaiton_ID will be automatically generated when a document is added to the Notifications collection
   user_ID: String,
   user_plant: String,
   notification_datetime: { type: Date, default: new Date()},
   notification_title: String,
   notification_body: String
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;