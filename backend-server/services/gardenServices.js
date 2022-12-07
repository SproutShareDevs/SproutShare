const gardenDatabase = require('../database/gardenDatabase');

 async function getAllGardens() {
   try {
      const allGardens = await gardenDatabase.getAllGardens();
      return allGardens;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function getGardenByKey(gardenKey){
   try {
      const garden = await gardenDatabase.getGardenByKey(gardenKey);
      return garden;
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

async function getGardensByUserKey(userKey){
   try {
      const gardens = await gardenDatabase.getGardensByUserKey(userKey);
      return gardens;
   } catch (error) {
      console.log(error);
      return JSON.stringify(error.message);
   }
}

async function getHistoryByUserKey(userKey){
   try{
      const history = await gardenDatabase.getHistoryByUserKey(userKey);
      return history;
   } catch (error) {
      console.log(error);
      return JSON.stringify(error.message);
   }
}

async function storeGarden(garden){
   try {
      const storedGarden = await gardenDatabase.storeGarden(garden);
      return storedGarden;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function updateGarden(gardenKey, garden){
   try {
      const updatedGarden = await gardenDatabase.updateGarden(gardenKey, garden);
      return updatedGarden;
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function archiveGarden(gardenKey){
   try {
      const archivedGarden = await gardenDatabase.archiveGarden(gardenKey);
      return archivedGarden;
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

async function deleteGarden(gardenKey){
   try {
      const deletedGarden = await gardenDatabase.deleteGarden(gardenKey);
      return deletedGarden;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

module.exports = {
   getAllGardens,
   getGardenByKey,
   getGardensByUserKey,
   getHistoryByUserKey,
   //getPostByQuery,
   storeGarden,
   updateGarden,
   archiveGarden,
   deleteGarden
};