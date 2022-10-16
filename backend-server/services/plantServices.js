const plantDatabase = require('../database/plantDatabase');


 async function getAllPlants() {
   try {
      const allPlants = await plantDatabase.getAllPlants();
      return allPlants;
   } catch (error) {
      console.error(error);
   }
}

async function getPlantByKey(plantKey){
   try {
      const singlePlant = await plantDatabase.getPlantByKey(plantKey);
      return singlePlant;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} query the search string for matching in the title and body of a ForumPost 
 * @returns a collection of ForumPosts


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
      await plantDatabase.storePlant(plant);
   } catch (error) {
      console.error(error);
   }
}

async function updatePlant(plantKey, plant){
   try {
      await plantDatabase.updatePlant(plantKey, plant);
   }catch (error) {
      console.error(error);
   }
}

async function deletePlant(plantKey){
   try {
      await plantDatabase.deletePlant(plantKey);
   } catch (error) {
      console.error(error);
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