const pool = require('../models/postgresPool');

/**
 * 
 * @returns a collection of UserPlant JSON Objects
 */
 async function getAllUserPlants() {
   try {
      const allUserPlants = await pool.query("SELECT * FROM userPlant");
      return allUserPlants.rows;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} userPlantKey The key of the userPlant to find 
 * @returns The userPlant that matches the userPlantKey parameter
 */

async function getUserPlantByKey(userPlantKey){
   try {
      const userPlant = await pool.query("SELECT * FROM userplant WHERE user_plant_key = $1", [userPlantKey]);
      return userPlant.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}
/**
 * 
 * @param {*} userKeyThe The user key of the user's plants
 * @returns The userPlants that matches the userKey parameter
 */
async function getUserPlantsByUserKey(userKey){
   try {
      const userPlants = await pool.query("SELECT * FROM userplant WHERE user_key = $1", [userKey]);
      return userPlants.rows;
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

/**
 * 
 * @param {*} gardenKey The garden key for a given userPlant
 * @returns The userPlant with the gardenKey parameter as a foreign key 
 */
async function getUserPlantsByGardenKey(gardenKey){
   try {
      const userPlants = await pool.query("SELECT * FROM userplant WHERE garden_key = $1", [gardenKey]);
      return userPlants.rows;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}


/**
 * 
 * @param {*} userPlant A new userPlant to store in the database
 * @return the stored usedplant or an error as a JSON object
 */

async function storeUserPlant(userPlant){
   try {
      const storedUserPlant = await pool.
      query('INSERT INTO userplant(user_key, plant_key, garden_key, plant_disease_key, plant_pest_key, plant_qty, plant_difficulty, plant_quality) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
         userPlant.user_key, 
         userPlant.plant_key, 
         userPlant.garden_key, 
         userPlant.plant_disease_key, 
         userPlant.plant_pest_key, 
         userPlant.plant_qty, 
         userPlant.plant_difficulty, 
         userPlant.plant_quality
      ]);
      return storedUserPlant.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} userPlantKey The userPlant to edit 
 * @param {*} userPlant The edit for the userPlant
 * @return the edited userplant or an error as a JSON object
 */

async function updateUserPlant(userPlantKey, userPlant){
   try {
      const updatedUserPlant = await pool.query("UPDATE userplant SET user_key=$1, plant_key=$2, garden_key=$3, plant_disease_key=$4, plant_pest_key=$5, plant_qty=$6, plant_difficulty=$7, plant_quality=$8 WHERE user_plant_key=$9 RETURNING *", 
      [
         userPlant.user_key, 
         userPlant.plant_key, 
         userPlant.garden_key, 
         userPlant.plant_disease_key, 
         userPlant.plant_pest_key, 
         userPlant.plant_qty, 
         userPlant.plant_difficulty, 
         userPlant.plant_quality,
         userPlantKey      
      ]);
      return updatedUserPlant.rows[0];   
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} userPlantKey The userPlant to edit 
 * @param {*} userPlant The edited difficulty for the userPlant
 * @return the edited userplant or an error as a JSON object
 */
async function updateUserPlantDifficulty(userPlantKey, userPlant){
   try {
      const updatedUserPlant = await pool.query("UPDATE userplant SET plant_difficulty=$1 WHERE user_plant_key=$2 RETURNING *", 
      [
         userPlant.plant_difficulty, 
         userPlantKey      
      ]);
      return updatedUserPlant.rows[0];   
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} userPlantKey The userPlant to edit 
 * @param {*} userPlant The edited quality for the userPlant
 * @return the edited userplant or an error as a JSON object
 */
async function updateUserPlantQuality(userPlantKey, userPlant){
   try {
      const updatedUserPlant = await pool.query("UPDATE userplant SET plant_quality=$1 WHERE user_plant_key=$2 RETURNING *", 
      [
         userPlant.plant_quality, 
         userPlantKey      
      ]);
      return updatedUserPlant.rows[0];   
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} userPlantKey The id of the ForumPost to delete 
 * @return the deleted userplant or an error as a JSON object
 */

async function deleteUserPlant(userPlantKey){
   try {
      const deletedUserPlant = await pool.query('DELETE FROM userplant WHERE user_plant_key = $1 RETURNING *', [userPlantKey]);
      return deletedUserPlant.rows[0];
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