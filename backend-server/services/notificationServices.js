const notificationDatabase = require('../database/notificationDatabase');
const sproutshareUserServices = require('./sproutShareUserServices');
const userPlantServices = require('./userPlantServices');
const weatherServices = require('./weatherServices');
const plantServices = require('./plantServices');

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
      let lastDaysRain;
      weatherServices.getDailyRainfall(user.zip_code, (rainfall) => {
         lastDaysRain = rainfall;
      });

      let rainToday = 0;
      let rain3Days = 0;
      weatherServices.getWeather3DayForecast(user.zip_code, (response) => {
         if(response.Forecast1rain) {
            rainToday = response.Forecast1rain + rainToday;
            rain3Days += response.Forecast1rain;
         }
         if(response.Forecast2rain) {
            rain3Days += response.Forecast2rain;
         }
         if(response.Forecast3rain) {
            rain3Days += response.Forecast3rain;
         }
      });

      let plantNeedsWatering = false;
      let sendNotification = false;

      // populate plantsToBeWatered
      for(let plant in userPlants) {

         let plantType = plantServices.getPlantByKey(userPlants[plant].plant_key);
         let wateringDecay = (1/plantType.water_need);

         userPlants[plant].water_amount += lastDaysRain;
         userPlants[plant].water_amount -= wateringDecay;

         // if after accounting for yesterdays rain the water amount is less than 0, push the plant to the notification
         if(userPlants[plant].water_amount <= 0) {
            plantNeedsWatering = true;
            // if theres rain tomorrow that may alter the watering schedule for the plant, let the user know
            if(userPlants[plant].water_amount + rainToday > 0) {
               plantsToBeWatered.push({
                  userPlant: userPlants[plant].user_plant_key,
                  plantType: userPlant[plant].plant_key,
                  rainMayAffectToday: true,
                  rainMayAffectSoon: true
               });
            // if theres rain in the next 3 days that may alter the watering schedule for the plant, let the user know
            } else if (userPlants[plant].water_amount + rain3Days > 0) {
               plantsToBeWatered.push({
                  userPlant: userPlants[plant].user_plant_key,
                  plantType: userPlant[plant].plant_key,
                  rainMayAffectToday: false,
                  rainMayAffectSoon: true
               });
            } else {
               plantsToBeWatered.push({
                  userPlant: userPlants[plant].user_plant_key,
                  plantType: userPlant[plant].plant_key,
                  rainMayAffectToday: false,
                  rainMayAffectSoon: false
               });
            }
         }

         // fetch last watering date of current plant
         let lastWateringDateRaw = userPlants[plant].last_watering_date;

         let daysAgoWatered = Math.ceil((currentDateRaw-lastWateringDateRaw)/(1000*60*60*24)).toString();
         // if older than a day, say it needs to be watered
         if(daysAgoWatered >= 2) {
            plantsToBeWatered.push(userPlants[plant].user_plant_key);
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