const userPlantDatabase = require('../database/userPlantDatabase');

 async function getAllUserPlants() {
   try {
      const allUserPlants = await userPlantDatabase.getAllUserPlants();
      return allUserPlants;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

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
      console.log(error);
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
   getUserPlantByKey,
   getUserPlantsByGardenKey,
   getUserPlantsByUserKey,
   //getPostByQuery,
   storeUserPlant,
   updateUserPlant,
   updateUserPlantDifficulty,
   updateUserPlantQuality,
   deleteUserPlant
};