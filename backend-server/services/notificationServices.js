const notificationDatabse = require('../database/notificationDatabase');

async function getAllNotifications() {
   try {
      const allNotifications = await notificationDatabse.getAllNotifications();
      return allNotifications;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getNotificationById(notificationId){
   try {
      const notification = await notificationDatabse.getNotificationById(notificationId);
      return notification;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getNotificationByQuery(query){
   try {
      const notifications = await notificationDatabse.getNotificationByQuery(query);
      return notifications;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function storeNotification(notification){
   try {
      const storedNotification = await notificationDatabse.storeNotification(notification);
      return storedNotification;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updateNotification(notificationId, notificationBody){
   try {
      const updatedNotification = await notificationDatabse.updateNotification(notificationId, notificationBody); 
      return updatedNotification;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function deleteNotification(notificationId){
   try {
      const deletedNotification = await notificationDatabse.deleteNotification(notificationId);
      return deletedNotification;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
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