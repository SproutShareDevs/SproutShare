const userPlantDatabase = require('../database/userPlantDatabase');

 async function getAllUserPlants() {
   try {
      const allUserPlants = await userPlantDatabase.getAllUserPlants();
      return allUserPlants;
   } catch (error) {
      console.error(error);
   }
}

async function getUserPlantByKey(userPlantKey){
   try {
      const singleUserPlant = await userPlantDatabase.getUserPlantByKey(userPlantKey);
      return singleUserPlant;
   } catch (error) {
      console.error(error);
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

async function getUserPlantByGardenKey(gardenKey){
   try {
      const userPlants = userPlantDatabase.getUserPlantByGardenKey(gardenKey);
      return userPlants;
   } catch (error) {
      console.log(error);
   }
}

async function storeUserPlant(userPlant){
   try {
      await userPlantDatabase.storeUserPlant(userPlant);
   } catch (error) {
      console.error(error);
   }
}

async function updateUserPlant(userPlantKey, userPlant){
   try {
      await userPlantDatabase.updateUserPlant(userPlantKey, userPlant);
   }catch (error) {
      console.error(error);
   }
}

async function deleteUserPlant(userPlantKey){
   try {
      await userPlantDatabase.deleteUserPlant(userPlantKey);
   } catch (error) {
      console.error(error);
   }
}

module.exports = {
   getAllUserPlants,
   getUserPlantByKey,
   getUserPlantByGardenKey,
   //getPostByQuery,
   storeUserPlant,
   updateUserPlant,
   deleteUserPlant
};