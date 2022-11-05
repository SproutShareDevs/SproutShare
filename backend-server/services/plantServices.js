const plantDatabase = require('../database/plantDatabase');


 async function getAllPlants() {
   try {
      const allPlants = await plantDatabase.getAllPlants();
      return allPlants;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getPlantByKey(plantKey){
   try {
      const plant = await plantDatabase.getPlantByKey(plantKey);
      return plant;
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

async function storePlant(plant){
   try {
      const storedPlant = await plantDatabase.storePlant(plant);
      return storedPlant;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updatePlant(plantKey, plant){
   try {
      const updatedPlant = await plantDatabase.updatePlant(plantKey, plant);
      return updatedPlant;
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function deletePlant(plantKey){
   try {
      const deletedPlant = await plantDatabase.deletePlant(plantKey);
      return deletedPlant;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

module.exports = {
   getAllPlants,
   getPlantByKey,
   //getPostByQuery,
   storePlant,
   updatePlant,
   deletePlant
};