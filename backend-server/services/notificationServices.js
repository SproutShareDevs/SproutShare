const notificationDatabase = require('../database/notificationDatabase');
const sproutshareUserServices = require('./sproutShareUserServices');
const weatherServices = require('./weatherServices');
const userPlantServices = require('./userPlantServices');
const plantServices = require('./plantServices');

async function getAllNotifications() {
   try {
      return "hey";
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
      console.log(userPlants);

      let rainToday = 0;
      let rain3Days = 0;

      function forecastPromise(zipCode) {
         return new Promise((resolve, reject) => {
            weatherServices.getWeather3DayForecast(zipCode, (response) => {
               resolve(response);
            }), (errorResponse) => {
               reject(errorResponse);
            }
         });
      }

      let forecastResponse = await forecastPromise(user.zip_code);

      if(!isNaN(forecastResponse.Forecast1rain)) {
         rainToday = parseFloat(forecastResponse.Forecast1rain);
         rain3Days += parseFloat(forecastResponse.Forecast1rain)
      }
      if(!isNaN(forecastResponse.Forecast2rain)) {
         rain3Days += parseFloat(forecastResponse.Forecast2rain);
      }
      if(!isNaN(forecastResponse.Forecast3rain)) {
         rain3Days += parseFloat(forecastResponse.Forecast3rain);
      }

      console.log("RAIN FIRST DAY: " + forecastResponse.Forecast1rain);
      console.log("RAIN SECOND DAY: " + forecastResponse.Forecast2rain);
      console.log("RAIN THIRD DAY: " + forecastResponse.Forecast3rain);

      console.log("RAIN 1 DAY: " + rainToday);
      
      console.log("RAIN 3 DAYS: " + rain3Days);

      let plantNeedsWatering = false;
      let sendNotification = false;

      // populate plantsToBeWatered
      for(let plant in userPlants) {

         let plantType = await plantServices.getPlantByKey(userPlants[plant].plant_key);

         // if  the water amount is less than 0, push the plant to the notification
         if(userPlants[plant].water_amount <= 0) {
            console.log("PLANT WATER AMOUNT WITH 1 DAY: " + (userPlants[plant].water_amount + rainToday));
            plantNeedsWatering = true;
            // if theres rain tomorrow that may alter the watering schedule for the plant, let the user know
            if(userPlants[plant].water_amount + rainToday > 0) {
               console.log("WOOOOO!!!!");
               plantsToBeWatered.push({
                  userPlant: userPlants[plant].user_plant_key,
                  plantType: plantType.common_name,
                  rainMayAffectToday: true,
                  rainMayAffectSoon: true
               });
            // if theres rain in the next 3 days that may alter the watering schedule for the plant, let the user know
            } else if (userPlants[plant].water_amount + rain3Days > 0) {
               plantsToBeWatered.push({
                  userPlant: userPlants[plant].user_plant_key,
                  plantType: plantType.common_name,
                  rainMayAffectToday: false,
                  rainMayAffectSoon: true
               });
            } else {
               plantsToBeWatered.push({
                  userPlant: userPlants[plant].user_plant_key,
                  plantType: plantType.common_name,
                  rainMayAffectToday: false,
                  rainMayAffectSoon: false
               });
            }
         }
      }
      // determine notification message, or lack thereof
      let notificationMessage = "";
      if(plantsToBeWatered.length == 1) {
         sendNotification = true;
         let plantName = plantsToBeWatered[0].plantType;
         
         if(plantsToBeWatered[0].rainMayAffectToday) {
            notificationMessage = plantName + " needs to be watered, but rain may affect your garden today. Check your local forecast"
         } else if (plantsToBeWatered[0].rainMayAffectSoon) {
            notificationMessage = plantName + " needs to be watered, but rain may affect your garden in the next few days. Check your local forecast"
         } else {
            notificationMessage = "Time to water your " + plantName + "!"
         }
      } else if (plantsToBeWatered.length > 1) {
         sendNotification = true;
         if(rainToday) {
            notificationMessage = "Some of your plants need to be watered, but rain may affect your garden today. Check your local forecast"
         } else if (rain3Days) {
            notificationMessage = "Some of your plants need to be watered, but it may rain this week."
         } else {
            notificationMessage = "Some of your plants need to be watered." 
         }
      } else {
         notificationMessage = "No plants need to be watered."
      }

      /*
         sendNotication: is push notification necessary?
         notificationMessage: message to be sent in notification if it is
         plantsToBeWatered: Array of plants that need to be watered, and booleans 
                            indicating if the plants will be affected by the upcoming weather
      */
      let response = {
         sendNotification: sendNotification,
         notificationMessage: notificationMessage,
         plantsToBeWatered: plantsToBeWatered
      }

      return response;

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