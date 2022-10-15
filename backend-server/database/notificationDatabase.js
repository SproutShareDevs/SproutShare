const Notifications = require('../models/Notification');

/**
 * 
 * @returns a collection of Notification JSON Objects
 */
async function getAllNotifications() {
   try {
      const allNotifications = await Notifications.find({});
      return allNotifications;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} notificationId The id of the Notification to find 
 * @returns The Notification that matches the notificationId parameter
 */
async function getNotificationById(notificationId){
   try {
      const singleNotification = await Notifications.findById(notificationId);
      return singleNotification;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} query the search string for matching in the title and body of a Notification 
 * @returns a collection of Notification JSON Objects
 */
async function getNotificationByQuery(query){
   try {
      const notifications = await Notifications.find()
      .or(
            [
               {user_plant: query},
               {notification_title: query}, 
               {notification_body: query}
            ]
      );
      return notifications;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} notification A new notification to store in the mongodb collection 
 */
async function storeNotification(notification){
   try {
      await Notifications.create(notification);
   } catch (error) {
      console.error(error);
   }
}
/**
 * 
 * @param {*} notificationId The Notification to edit 
 * @param {*} notificationBody The edit for the Notification
 */
async function updateNotification(notificationId, notificationBody){
   try {
      await Notifications.findByIdAndUpdate(notificationId, notificationBody); 
   } catch (error) {
      console.error(error);
   }
}
/**
 * 
 * @param {*} notificationId The id of the Notification to delete 
 */
async function deleteNotification(notificationId){
   try {
      await Notifications.findByIdAndDelete(notificationId);
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