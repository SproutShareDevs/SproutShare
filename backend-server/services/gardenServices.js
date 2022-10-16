const gardenDatabase = require('../database/gardenDatabase');

 async function getAllGardens() {
   try {
      const allGardens = await gardenDatabase.getAllGardens();
      return allGardens;
   } catch (error) {
      console.error(error);
   }
}

async function getGardenByKey(gardenKey){
   try {
      const singleGarden = await gardenDatabase.getGardenByKey(gardenKey);
      return singleGarden;
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

async function getGardenByUserKey(userKey){
   try {
      const gardens = await gardenDatabase.getGardenByUserKey(userKey);
      return gardens;
   } catch (error) {
      console.log(error);
   }
}

async function storeGarden(garden){
   try {
      await gardenDatabase.storeGarden(garden);
   } catch (error) {
      console.error(error);
   }
}

async function updateGarden(gardenKey, garden){
   try {
      await gardenDatabase.updateGarden(gardenKey, garden);
   }catch (error) {
      console.error(error);
   }
}

async function deleteGarden(gardenKey){
   try {
      await gardenDatabase.deleteGarden(gardenKey);
   } catch (error) {
      console.error(error);
   }
}

module.exports = {
   getAllGardens,
   getGardenByKey,
   getGardenByUserKey,
   //getPostByQuery,
   storeGarden,
   updateGarden,
   deleteGarden
};