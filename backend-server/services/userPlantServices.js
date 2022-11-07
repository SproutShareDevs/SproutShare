const userPlantDatabase = require('../database/userPlantDatabase');
const sproutShareUserDatabase = require('../database/sproutShareUserDatabase');

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
/*******AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA*******/
async function getRecommendedPlants(zipCode){
   try {
	   // plantsMap stores keys of plant_key and maps to values of arrays of [total quality (numerator), total number of plants (denominator)]
	   // that together can be put together to calculate the average quality of a plant
      plantsMap = new Map();
	  users = await sproutShareUserDatabase.getUserByZipCode(zipCode);
	  for(user of users){
		  arrayOfPlants = await userPlantDatabase.getUserPlantsByUserKey(user.user_key);
		  arrayOfPlants.forEach( plant => {
			  if(!plantsMap.has(plant.plant_key)){
				  plantsMap.set(plant.plant_key, [plant.plant_quality, 1]);
			  }
			  else {
				  // Add quality to numerator and increment denominator
				  let temp = [plantsMap.get(plant.plant_key)[0] + plant.plant_quality, plantsMap.get(plant.plant_key)[1] + 1];
				  plantsMap.set(plant.plant_key, temp);
			  }
		  })
	  }
	  // It doesn't like to return maps so I have to convert it to an array :/
	  plantsArr = [];
	  plantsMap.forEach( (value, key, map) => {
		  plantsArr.push( [key, value] );
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

async function deleteUserPlant(userPlantKey){
   try {
      const deletedUserPlant = await userPlantDatabase.deleteUserPlant(userPlantKey);
      return deletedUserPlant;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

module.exports = {
   getAllUserPlants,
   getUserPlantsByUserKey,
   getUserPlantByKey,
   getUserPlantsByGardenKey,
   getUserPlantsByUserKey,
   getRecommendedPlants,
   //getPostByQuery,
   storeUserPlant,
   updateUserPlant,
   updateUserPlantDifficulty,
   updateUserPlantQuality,
   deleteUserPlant
};