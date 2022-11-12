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

      /**
       * let lastDaysRain = userPlants[plant].yesterdaysRain;
       * plantWaterAmount += lastDaysRain
       * // additionally, have a query for user on the next day to confirm if it rained or not, if they say it didn't, set lastDaysRain to 0
       * 
       * let wateringDecay = 1 / userPlants[plant].watering_need;
       * plantWaterAmount -= wateringDecay
       * 
       * if(plantWaterAmount <= 0) {
       *    let rainToday = get1DayForecast
       *    userPlants[plant.yesterdaysRain] = rainToday; // will be used the next day
       *    if(rainToday > 0) {
       *       plantsToBeWatered.push(plant, rainMayAffectGardenToday);
       *    } else If(get5DayForecast.rain !== null) {
       *       rainSoon = true
       *       // notify, but ignore rain totals more than a day out
       *       plantsToBeWatered.push(plant, rainMayAffectGardenThisWeek);
       *    } else {
       *      plantsToBeWatered.push(plant, rainWillNotAffectGarden)
       *    }
       * } else {
       *    // dont send a notification 
       * }
       */

         // fetch last watering date of current plant
         let lastWateringDateRaw = userPlants[plant].last_watering_date;

         let daysAgoWatered = Math.ceil((currentDateRaw-lastWateringDateRaw)/(1000*60*60*24)).toString();
         // if older than a day, say it needs to be watered
         if(daysAgoWatered >= 2) {
            plantsToBeWatered.push(userPlants[plant].user_plant_key);
         }
      }


      /**
       * if(plantsToBeWatered.length == 1) {
       *    let plantName = plantsToBeWatered[0].plant_name
       *    let message = ""
       *    if(rainToday) {
       *       message = plantName + " needs to be watered, but rain may affect your garden today. Check your local forecast"
       *    } else if (rainSoon) {
       *       message = plantName + " needs to be watered, but it may rain this week."
       *    } else {
       *       message = "Time to water your " + plantName + "!" 
       *    }
       *    let response = {
       *       sendNotification: true,
       *       message: message,
       *       plantsToBeWatered: plantsToBeWatered
       *    }
       * } else if(plantsToBeWatered.length > 0) {
       *    let message = ""
       *    if(rainToday) {
       *       message = "Some of your plants need to be watered, but rain may affect your garden today. Check your local forecast"
       *    } else if (rainSoon) {
       *       message = "Some of your plants need to be watered, but it may rain this week."
       *    } else {
       *       message = "Some of your plants need to be watered." 
       *    }
       *    let response = {
       *       sendNotification: true,
       *       message: message,
       *       plantsToBeWatered: plantsToBeWatered
       *    }
       * }  else {
       *    // don't send a notification
       *    let response = {
       *       sendNotification: false
       *       message: "No plants need to be watered."
       *    }
       * }
       *    
       *    return response;
       *    
       * }
       * 
       */

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