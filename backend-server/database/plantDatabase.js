const pool = require('../models/postgresPool');

/**
 * 
 * @returns a collection of Plant JSON Objects
 */
 async function getAllPlants() {
   try {
      const allPlants = await pool.query("SELECT * FROM plant");
      return allPlants.rows;
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} plantKey The key of the Plant to find 
 * @returns The Plant that matches the plantKey parameter
 */

async function getPlantByKey(plantKey){
   try {
      const plant = await pool.query("SELECT * FROM plant WHERE plant_key = $1", [plantKey]);
      return plant.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
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

/**
 * 
 * @param {*} plant A new Plant to store in the database
 * @return the stored plant or an error as a JSON object
 */

async function storePlant(plant){
   try {
      const storedPlant = await pool.query(
         'INSERT INTO plant (common_name, latin_name, light_level, min_temp, max_temp, rec_temp, hardiness_zone, soil_type, img) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
         [plant.common_name, plant.latin_name, plant.light_level, plant.min_temp, plant.max_temp, plant.rec_temp, plant.hardiness_zone, plant.soil_type, plant.img]);
      return storedPlant.rows[0];
   } catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} plantKey The Plant to edit 
 * @param {*} plant The edit for the Plant
 * @return the updated plant or an error as a JSON object
 */

async function updatePlant(plantKey, plant){
   try {
      const updatedPlant = await pool.query(
         'UPDATE plant SET common_name= $1, latin_name = $2 , light_level = $3, min_temp = $4, max_temp =$5, rec_temp = $6, hardiness_zone = $7, soil_type = $8, img = $9) WHERE plant_key = $10 RETURNING *',
         [plant.common_name, plant.latin_name, plant.light_level, plant.min_temp, plant.max_temp, plant.rec_temp, plant.hardiness_zone, plant.soil_type, plant.img, plantKey]);   
      return updatedPlant.rows[0];
   }catch (error) {
      console.error(error);
      return JSON.stringify(error.message);
   }
}

/**
 * 
 * @param {*} plantKey The id of the ForumPost to delete 
 * @return the deleted plant or an error as a JSON object
 */

async function deletePlant(plantKey){
   try {
      const deletedPlant = await pool.query("DELETE FROM plant WHERE plant_key = $1 RETURNING *", [plantKey]);
      return deletedPlant.rows[0];
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