const userPlantDatabase = require('../database/userPlantDatabase');
const sproutShareUserDatabase = require('../database/sproutShareUserDatabase');
const weatherServices = require('./weatherServices');
const plantServices = require('./plantServices');
const userServices = require('./sproutShareUserServices');

 async function getAllUserPlants() {
   try {
      const allUserPlants = await userPlantDatabase.getAllUserPlants();
      return allUserPlants;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

// get all user plants from user from user_key
async function getUserPlantsByUserKey(userKey) {
   try {
      const userPlants = await userPlantDatabase.getUserPlantsByUserKey(userKey);
      return userPlants;
   } catch(error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

// get user plant from user_plant_key
async function getUserPlantByKey(userPlantKey){
   try {
      const userPlant = await userPlantDatabase.getUserPlantByKey(userPlantKey);
      return userPlant;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getUserPlantsByUserKey(userKey){
   try {
      const userPlants = await userPlantDatabase.getUserPlantsByUserKey(userKey);
      return userPlants;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getUserPlantsToBeWatered(accessToken){
   try {
      const user = await userServices.getUserByToken(accessToken);
      const userPlants = await userPlantDatabase.getUserPlantsToBeWatered(user.user_key)
      return userPlants;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}


/*******AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA*******/
async function getRecommendedPlants(zipCode){
   try {
	   // plantsMap stores keys of plant_key and maps to values of objects of {totalQuality (numerator), totalNumber of plants (denominator)]
	   // that together can be put together to calculate the average quality of a plant
     plantsMap = new Map();
	  users = await sproutShareUserDatabase.getUserByZipCode(zipCode);
	  for(user of users){
		  arrayOfPlants = await userPlantDatabase.getUserPlantsByUserKey(user.user_key);
		  arrayOfPlants.forEach( plant => {
			  if(!plantsMap.has(plant.plant_key)){
				  let temp = {};
				  temp.totalQuality = plant.plant_quality;
				  temp.totalNumber = plant.plant_qty;
				  plantsMap.set(plant.plant_key, temp);
			  }
			  else {
				  // Add quality to numerator and increment denominator
				  // let temp = [plantsMap.get(plant.plant_key)[0] + plant.plant_quality, plantsMap.get(plant.plant_key)[1] + 1];
				  let temp = {};
				  temp.totalQuality = plantsMap.get(plant.plant_key).totalQuality + plant.plant_quality;
				  temp.totalNumber = plantsMap.get(plant.plant_key).totalNumber + plant.plant_qty
				  plantsMap.set(plant.plant_key, temp);
			  }
		  })
	  }
	  // It doesn't like to return maps so I have to convert it to an array :/
	  plantsArr = [];
	  plantsMap.forEach( (value, key, map) => {
		  plant = {};
		  plant.id = key;
		  plant.average = value;
		  plantsArr.push( plant );
	  })
	  plantsArr.sort( (a, b) => {
		  // Returns a positive value if b average > a average, sorting b before a, creating a descending list of plants by how good they are
		  return (b.average.totalQuality/b.average.totalNumber) - (a.average.totalQuality/a.average.totalNumber);
	  })
	  return plantsArr;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}


async function getRecommendedPlantsByCoords(userLat, userLong, radius){
   try {
	   // plantsMap stores keys of plant_key and maps to values of objects of {totalQuality (numerator), totalNumber of plants (denominator)]
	   // that together can be put together to calculate the average quality of a plant
     plantsMap = new Map();
	  users = await sproutShareUserDatabase.getUserByCoords(userLat, userLong, radius);
	  for(user of users){
		  arrayOfPlants = await userPlantDatabase.getUserPlantsByUserKey(user.user_key);
		  arrayOfPlants.forEach( plant => {
			  // acos( sin( radians(user_lat) )*sin( radians($1) ) + cos( radians(user_lat) )*cos( radians($1) )*cos( radians(user_long)-radians($2) ) )*6371.009
			  // let dist = sqrt( (userLat - user.user_lat)^2 + (userLong - user.user_long)^2 ); Old, do not use
			  let dist = Math.acos( Math.sin( user.user_lat * Math.PI / 180 )*Math.sin( userLat * Math.PI / 180 ) + Math.cos( user.user_lat * Math.PI / 180 )*Math.cos( userLat * Math.PI / 180 )*Math.cos( (user.user_long * Math.PI / 180)-(userLong * Math.PI / 180) ) )*6371.009;
			  if(!plantsMap.has(plant.plant_key)){
				  let temp = {};
				  temp.totalQuality = plant.plant_quality*( radius/(radius + dist) );
				  temp.totalNumber = plant.plant_qty;
				  plantsMap.set(plant.plant_key, temp);
			  }
			  else {
				  // Add quality to numerator and increment denominator
				  // let temp = [plantsMap.get(plant.plant_key)[0] + plant.plant_quality, plantsMap.get(plant.plant_key)[1] + 1];
				  let temp = {};
				  temp.totalQuality = plantsMap.get(plant.plant_key).totalQuality + plant.plant_quality*( radius/(radius + dist) );
				  temp.totalNumber = plantsMap.get(plant.plant_key).totalNumber + plant.plant_qty
				  plantsMap.set(plant.plant_key, temp);
			  }
		  })
	  }
	  // It doesn't like to return maps so I have to convert it to an array :/
	  plantsArr = [];
	  plantsMap.forEach( (value, key, map) => {
		  plant = {};
		  plant.id = key;
		  plant.average = value;
		  plantsArr.push( plant );
	  })
	  plantsArr.sort( (a, b) => {
		  // Returns a positive value if b average > a average, sorting b before a, creating a descending list of plants by how good they are
		  return (b.average.totalQuality/b.average.totalNumber) - (a.average.totalQuality/a.average.totalNumber);
	  })
	  return plantsArr;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
async function getPostByQuery(query){
   try {
      const posts = await ForumPosts.find()
      .or(
            [
               {user_plant: query},
               {forum_post_title: query}, 
               {forum_post_body: query}
            ]
      );
      return posts;
   } catch (error) {
      console.error(error);
   }
}
*/

async function getUserPlantsByGardenKey(gardenKey){
   try {
      const userPlants = userPlantDatabase.getUserPlantsByGardenKey(gardenKey);
      return userPlants;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function storeUserPlant(userPlant){
   try {
      const storedUserPlant = await userPlantDatabase.storeUserPlant(userPlant);
      return storedUserPlant;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updateUserPlant(userPlantKey, userPlant){
   try {
      const updatedUserPlant = await userPlantDatabase.updateUserPlant(userPlantKey, userPlant);
      return updatedUserPlant;
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updateUserPlantDifficulty(userPlantKey, userPlant){
   try {
      const updatedUserPlant = await userPlantDatabase.updateUserPlantDifficulty(userPlantKey, userPlant);
      return updatedUserPlant;
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updateUserPlantQuality(userPlantKey, userPlant){
   try {
      const updatedUserPlant = await userPlantDatabase.updateUserPlantQuality(userPlantKey, userPlant);
      return updatedUserPlant;
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updateUserPlantWaterAmount(userPlantKey, waterAmount) {
   try {
      const updatedUserPlant = await userPlantDatabase.updateUserPlantWaterAmount(userPlantKey, waterAmount);
      return updatedUserPlant;
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function deleteUserPlant(userPlantKey){
   try {
      const deletedUserPlant = await userPlantDatabase.deleteUserPlant(userPlantKey);
      return deletedUserPlant;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}


/**
 * Get all user plants, advance their water decay by the amount of days specified
   and account for the rain passed in.
 * @param {*} rainAmount The amount of rain over the provided period of days
 * @param {*} accessToken The users access token
 * @param {*} days The amount of days to account for decay of water_amount
 */
async function advanceDays(rainAmount, accessToken, days) {
   try {
      const user = await userServices.getUserByToken(accessToken);
      const userPlants = await getUserPlantsByUserKey(user.user_key);
      
      for(let plant in userPlants) {
         let plantType = await plantServices.getPlantByKey(userPlants[plant].plant_key);
         let wateringDecay = (1/plantType.water_need);
         
         let waterChange = (rainAmount - (days * wateringDecay));

         userPlants[plant].water_amount += waterChange;

         await userPlantDatabase.updateUserPlantWaterAmount(userPlants[plant].user_plant_key, userPlants[plant].water_amount);
      
         console.log("Updated Water Amount: " + userPlants[plant].water_amount + "\n\n");

      }

      return userPlants;

   } catch(error) {
      console.log("Error occured in advanceTime services function");
      console.log(error);
      return JSON.stringify(error.message);
   }
}

/**
 * Get all user plants, advance their water decay by one day 
   and accounts for the last 24 hours of rain in their area
 * @param {*} accessToken The users access token
 */
async function advanceRealDay(accessToken) {
   try {
      const user = await userServices.getUserByToken(accessToken);
      const userPlants = await getUserPlantsByUserKey(user.user_key);

      let lastDaysRain;
      weatherServices.getDailyRainfall(user.zip_code, (rainfall) => {
         lastDaysRain = rainfall;
      });
      
      for(let plant in userPlants) {
         let plantType = await plantServices.getPlantByKey(userPlants[plant].plant_key);
         let wateringDecay = (1/plantType.water_need);
         
         let waterChange = (lastDaysRain - (days * wateringDecay));

         userPlants[plant].water_amount += waterChange;

         await userPlantDatabase.updateUserPlantWaterAmount(userPlants[plant].user_plant_key, userPlants[plant].water_amount);
         console.log("Real day weather added to water amount.");
      }

      return userPlants;

   } catch(error) {
      console.log("Error occured in advanceRealDay services function");
      console.log(error);
      return JSON.stringify(error.message);
   }
}


module.exports = {
   getAllUserPlants,
   getUserPlantsByUserKey,
   getUserPlantByKey,
   getUserPlantsByGardenKey,
   getUserPlantsByUserKey,
   getUserPlantsToBeWatered,
   getRecommendedPlants,
   getRecommendedPlantsByCoords,
   //getPostByQuery,
   storeUserPlant,
   updateUserPlant,
   updateUserPlantDifficulty,
   updateUserPlantQuality,
   updateUserPlantWaterAmount,
   deleteUserPlant,
   advanceDays,
   advanceRealDay
};