const pool = require('../models/postgresPool');

/**
 * 
 * @returns a collection of Garden JSON Objects
 */
 async function getAllGardens() {
   try {
      const allGardens = await pool.query("SELECT * FROM garden");
      return allGardens.rows;
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} gardenKey The key of the garden to find 
 * @returns The garden that matches the gardenKey parameter
 */

async function getGardenByKey(gardenKey){
   try {
      const singleGarden = await pool.query("SELECT * FROM garden WHERE garden_key = $1", [gardenKey]);
      return singleGarden.rows[0];
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

/**
 * 
 * @param {*} userKey The user key for a given garden
 * @returns The garden matching the userkey parameter as a foreign key 
 */
async function getGardenByUserKey(userKey){
   try {
      const gardens = await pool.query("SELECT * FROM garden WHERE user_key = $1", [userKey]);
      return gardens.rows;
   } catch (error) {
      console.log(error);
   }
}


/**
 * 
 * @param {*} garden A new garden to store in the database
 */
async function storeGarden(garden){
   try {
      await pool.query("INSERT INTO garden(user_key, soil_key, light_level) VALUES ($1, $2, $3)",
      [garden.user_key, garden.soil_key, garden.light_level]);
   } catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} gardenKey The garden to edit 
 * @param {*} garden The edit for the garden
 */
async function updateGarden(gardenKey, garden){
   try {
      await pool.query("UPDATE garden SET user_key = $1, soil_key = $2, light_level = $3 WHERE garden_key = $4", 
      [garden.user_key, garden.soil_key, garden.light_level, gardenKey]);
   }catch (error) {
      console.error(error);
   }
}

/**
 * 
 * @param {*} gardenKey The key of the garden to delete 
 */

async function deleteGarden(gardenKey){
   try {
      await pool.query("DELETE FROM garden WHERE garden_key = $1 RETURNING *", [gardenKey]);
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