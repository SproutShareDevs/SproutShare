const notificationDatabase = require('../database/notificationDatabase');
const sproutshareUserServices = require('./sproutShareUserServices');
const userPlantServices = require('./userPlantServices');

async function getAllNotifications() {
   try {
      const allNotifications = await notificationDatabase.getAllNotifications();
      return allNotifications;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

// much more logic to be implemented in here!
async function getNotificationByToken(accessToken){
   try {
      const user = await sproutshareUserServices.getUserByToken(accessToken);
      const userPlants = await userPlantServices.getUserPlantsByUserKey(user.user_key);
      let plantsToBeWatered = [];

      let currentDateRaw = new Date();

      for(let plant in userPlants) {
         // fetch last watering date of current plant
         let lastWateringDateRaw = userPlants[plant].last_watering_date;

         let daysAgoWatered = Math.ceil((currentDateRaw-lastWateringDateRaw)/(1000*60*60*24)).toString();
         // if older than a day, say it needs to be watered
         if(daysAgoWatered >= 2) {
            plantsToBeWatered.push(userPlants[plant].user_plant_key);
         }
      }
      // if theres plants that need to be watered, send notification
      if(plantsToBeWatered.length > 0) {
         let response = {
            plantsToBeWatered: plantsToBeWatered,
            sendNotification: true,
            message: "Some of your plants need to be watered!"
         }
         return response;
      // if not
      } else {
         let response = {
            sendNotification: false,
            message: "None of your plants need to be watered!"
         }
         return response;
      }
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getNotificationById(notificationId){
   try {
      const notification = await notificationDatabase.getNotificationById(notificationId);
      return notification;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getNotificationByQuery(query){
   try {
      const notifications = await notificationDatabase.getNotificationByQuery(query);
      return notifications;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function storeNotification(notification){
   try {
      const storedNotification = await notificationDatabase.storeNotification(notification);
      return storedNotification;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updateNotification(notificationId, notificationBody){
   try {
      const updatedNotification = await notificationDatabase.updateNotification(notificationId, notificationBody); 
      return updatedNotification;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function deleteNotification(notificationId){
   try {
      const deletedNotification = await notificationDatabase.deleteNotification(notificationId);
      return deletedNotification;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

module.exports = {
   getAllNotifications,
   getNotificationByToken,
   getNotificationById,
   getNotificationByQuery,
   storeNotification,
   updateNotification,
   deleteNotification
};