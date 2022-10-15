const notificationDatabse = require('../database/notificationDatabase');

async function getAllNotifications() {
   try {
      const allNotifications = await notificationDatabse.getAllNotifications();
      return allNotifications;
   } catch (error) {
      console.error(error);
   }
}

async function getNotificationById(notificationId){
   try {
      const singleNotification = await notificationDatabse.getNotificationById(notificationId);
      return singleNotification;
   } catch (error) {
      console.error(error);
   }
}

async function getNotificationByQuery(query){
   try {
      const notifications = await notificationDatabse.getNotificationByQuery(query);
      return notifications;
   } catch (error) {
      console.error(error);
   }
}

async function storeNotification(notification){
   try {
      await notificationDatabse.storeNotification(notification);
   } catch (error) {
      console.error(error);
   }
}

async function updateNotification(notificationId, notificationBody){
   try {
      await notificationDatabse.updateNotification(notificationId, notificationBody); 
   } catch (error) {
      console.error(error);
   }
}

async function deleteNotification(notificationId){
   try {
      await notificationDatabse.deleteNotification(notificationId);
   } catch (error) {
      console.error(error);
   }
}

module.exports = {
   getAllNotifications,
   getNotificationById,
   getNotificationByQuery,
   storeNotification,
   updateNotification,
   deleteNotification
};