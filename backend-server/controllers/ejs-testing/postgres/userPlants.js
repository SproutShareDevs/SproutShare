const express = require('express');
const router = express.Router();
const pool = require('../../../models/postgresPool');


/** 
 * For displaying the user plants page
 * Reads from userplants table and retrieves all records
 * sends them to ejs for rendering
 * If an error occurs, redirect to userPlants ejs page and output error on console
*/
router.get('/', async(req, res)=>{
   try {
      const getAllUserPlants = await pool.query("SELECT * FROM userplant");
      const userPlants = getAllUserPlants.rows;
      res.render('userPlants', {userPlants});
   } catch (error) {
      console.log(error.message);
      res.redirect('/ejs-testing/userPlants');
   }
});

/** 
 * For displaying a single userplant based on user_plant_id
 * Retrieves the row in userplant with the passed user_plant_id
 * renders the ejs page userPlants with the retrieved row
 * If an error occurs, redirect to userPlants ejs page and output error on console
 */
router.get('/id', async(req, res)=>{
   const user_plant_id = req.query.id;
   try {
      const getUserPlantById = await pool.query("SELECT * FROM userplant WHERE user_plant_id = $1", [user_plant_id]);
      const userPlants = getUserPlantById.rows;
      res.render('userPlants', {userPlants});
   } catch (error) {
      console.log(error.message);
      res.redirect('/ejs-testing/userPlants');
   }
});

/**
 * for displaying a collection or a single garden based on garden_id
 * the user plant(s) to retrieved are requested via garden_id
 * queries the userplant table 
 * renders the ejs page userPlants with the retrieved row(s)
 * If an error occurs, redirect to userPlants ejs page and output error on console
 */

router.get('/getByGarden/id', async(req, res)=>{
   const garden_id = req.query.id;
   try {
      const getUserPlantByGardenId = await pool.query("SELECT * FROM userplant WHERE garden_id = $1", [garden_id]);
      const userPlants = getUserPlantByGardenId.rows;
      res.render('userPlants', {userPlants});
   } catch (error) {
      console.log(error.message);
      res.redirect('/ejs-testing/userPlants');
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
         'INSERT INTO userplant(user_id, plant_id, garden_id, plant_disease_id, plant_pest_id, plant_qty, plant_difficulty, plant_quality) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [r.user_id, r.plant_id, r.garden_id, r.plant_disease_id, r.plant_pest_id, r.plant_qty, r.plant_difficulty, r.plant_quality]);
   } catch (error) {
      console.log(error.message);
   }
   res.redirect('/ejs-testing/userPlants');
});
/**
 * This route updates a record in the userplant table
 * the user_plant_id is used to find the record
 * req.body is used to update the record
 * if successful the response is a redirect to userPlants
 * if error the error is logged on the console and the response is a redirect to userPlants 
 */
router.put('/update/:id', async(req,res)=>{
   const user_plant_id = req.query.id;
   const r = req.body;
   try {
      const userPlantToUpdate = await pool.query("UPDATE userplant SET user_id = $1, plant_id = $2, garden_id = $3, plant_disease_id = $4, plant_pest_id = $5, plant_qty = $6, plant_difficulty = $7, plant_quality = $8 WHERE user_plant_id  = $9", 
      [r.user_id, r.plant_id, r.garden_id, r.plant_disease_id, r.plant_pest_id, r.plant_qty, r.plant_difficulty, r.plant_quality]);
   } catch (error) {
      console.log(error.message);
   }
   res.redirect('/ejs-testing/userPlants');
});
/**
 * This route deletes a record from the userplant table
 * the record to delete is given by the user_plant_id
 * if successful the response is a redirect
 * if error the error is logged on the console and the response is a redirect
 */
router.delete('/delete/:id', async(req,res)=>{
   try {
      const userPlantToDelete = await pool.query('DELETE FROM userplant WHERE user_plant_id = $1', [req.params.id]);
   } catch (error) {
      console.log(error.message);
   }
   res.redirect('/ejs-testing/userPlants');
});

module.exports = router;