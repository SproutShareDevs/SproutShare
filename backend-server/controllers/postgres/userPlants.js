const express = require('express');
const router = express.Router();
const pool = require('../../models/postgresPool');

/** 
 * userplants base url
 * Reads from userplants table and retrieves all records
 * sends them to prod as a JSON message
 * If an error occurs, send the error message to prod
*/
router.get('/', async(req, res)=>{
   try {
      const getAllUserPlants = await pool.query("SELECT * FROM userplant");
      res.send(getAllUserPlants.rows);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});

/** 
 * For displaying a single userplant based on user_plant_id
 * Retrieves the row in userplant with the passed user_plant_id
 * sends the retrieved row to prod as a JSON object
 * If an error occurs,  send the error to prod as a JSON object 
*/
router.get('/:id', async(req, res)=>{
   try {
      const getUserPlantById = await pool.query("SELECT * FROM userplant WHERE user_plant_id = $1", [req.params.id]);
      res.send(getUserPlantById.rows[0]);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});

/**
 * for displaying a single userplant or collection of userplants
 * the user plant(s) to retrieved are requested via garden_id
 * queries the userplant table 
 * sends the retrieved row(s) to prod as a JSON object
 * If an error occurs, send the error to prod as a JSON object
 */
router.get('/getByGarden/:id', async(req, res)=>{
   try {
      const getUserPlantByGardenId = await pool.query("SELECT * FROM userplant WHERE garden_id = $1", [req.params.id]);
      res.send(getUserPlantByGardenId.rows);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});

/**
 * coming soon...
 */
router.get('/query', async(req,res)=>{
   //... db call using pool
   // not implemented yet
});

/**
 * Inserts a record into the userplant table
 * The body of the request is used to create the insert statement
 * on success the page redirects
 * on error the error is logged in the console and the page is redirected 
 */
router.post('/store', async(req,res)=>{
   const r = req.body;
   try {
      const userPlantToInsert = 
      await pool.
      query(
         'INSERT INTO userplant(user_id, plant_id, garden_id, plant_disease_id, plant_pest_id, plant_qty, plant_difficulty, plant_quality) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [r.user_id, r.plant_id, r.garden_id, r.plant_disease_id, r.plant_pest_id, r.plant_qty, r.plant_difficulty, r.plant_quality]);
      res.send(userPlantToInsert.rows[0]);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});
/**
 * This route updates a record in the userplant table
 * the user_plant_id is used to find the record
 * req.body is used to update the record
 * if successful send the updated record as a JSON object to prod
 * if error the error is sent as a JSON object 
 */
router.put('/update/:id', async(req,res)=>{
   const r = req.body;
   try {
      const userPlantToUpdate = await pool.query("UPDATE userplant SET user_id = $1, plant_id = $2, garden_id = $3, plant_disease_id = $4, plant_pest_id = $5, plant_qty = $6, plant_difficulty = $7, plant_quality = $8 WHERE user_plant_id  = $9 RETURNING *", 
      [r.user_id, r.plant_id, r.garden_id, r.plant_disease_id, r.plant_pest_id, r.plant_qty, r.plant_difficulty, r.plant_quality, req.params.id]);
      res.send(userPlantToUpdate.rows[0]);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});
/**
 * This route deletes a record from the userplant table
 * the record to delete is given by the user_plant_id
 * if successful the response is a redirect
 * if error the error is logged on the console and the response is a redirect
 */
router.delete('/delete/:id', async(req,res)=>{
   try {
      const userPlantToDelete = await pool.query('DELETE FROM userplant WHERE user_plant_id = $1 RETURNING *', [req.params.id]);
      res.send(userPlantToDelete.rows[0]);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});

module.exports = router;