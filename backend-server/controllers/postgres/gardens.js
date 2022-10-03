const express = require('express');
const router = express.Router();
const pool = require('../../models/postgresPool');


/** 
 * For retrieving all gardens
 * queries the garden table
 * sends to prod as 
 * if there is an error, the message is sent instead
*/
router.get('/', async(req, res)=>{
   try {
      const getAllGardens = await pool.query("SELECT * FROM garden");
      res.send(getAllGardens.rows);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});

/** 
 * This route sends a single garden
 * The garden to send is requested by the garden_id parameter in the request
 * queries the garden table
 * sends to prod as a JSON obj
 * if there is an error, the message is sent instead
 */
router.get('/:id', async(req, res)=>{
   try {
      const getGardenById = await pool.query("SELECT * FROM garden WHERE garden_id = $1", [req.params.id]);
      res.send(getGardenById.rows); 
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});

/**
 * this route gets either a collection or a single garden
 * the garden(s) to send are requested via the user_id
 * queries the garden table
 * sends to prod as a JSON obj
 * if there is an error, the message is sent instead
 */

router.get('/getByUser/:id', async(req, res)=>{
   try {
      const getGardenByUser = await pool.query("SELECT * FROM garden WHERE user_id = $1", [req.params.id]);
      res.send(getGardenByUser.rows);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
})

/**
 * This route can be used to find a users garden by users first name (partial match too)
 * does not work, but also will not crash anything (hopefully)
 * work in progresss
 */
router.get('/search', async(req,res)=>{
   const firstName = req.query.string;
   console.log(firstName);
   try {
      const getSproutShareUser = await pool.query("SELECT * FROM sproutshareuser WHERE first_name LIKE %$1%", [firstName]);
      console.log(getSproutShareUser.rows);

   } catch (error) {
      console.log("in catch");
   }
   res.send(JSON.stringify("Sorry, but I don't work yet"))
   /*const getGardenBySearch = await pool.query(
      "SELECT * FROM garden WHERE user_id IN (SELECT user_id FROM sproutshareuser WHERE first_name LIKE '%$1%')", 
      [firstName]
   );*/
   //const gardens = getGardenBySearch.rows;
});

/**
 * This route inserts a garden record into the garden table
 * Receives the parameters via req.body
 * sends back the inserted row as a JSON object
 * if there is an error, the message is sent instead
 */

router.post('/store', async(req,res)=>{
   try {
      const gardenToInsert = await pool.query("INSERT INTO garden(user_id, soil_id, light_level) VALUES ($1, $2, $3) RETURNING *", 
      [req.body.user_id, req.body.soil_id, req.body.light_level]);
      res.send(gardenToInsert.rows[0]);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});

/**
 * This route takes a garden_id as a route parameter (req.params.id) and updates that garden using information
 * passed in req.body
 * sends back the updated record
 * if there is an error, the message is sent instead
 */
router.put('/update/:id', async(req,res)=>{
   try {
      const gardenToUpdate = await pool.query("UPDATE garden SET user_id = $1, soil_id = $2, light_level = $3 WHERE garden_id = $4 RETURNING *", 
      [req.body.user_id, req.body.soil_id, req.body.light_level, req.params.id]);
   res.send(gardenToUpdate.rows[0]);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});


/**
 * This route deletes a record in the garden table
 * the record to delete is found by the garden_id
 * the deleted record is returned back to prod as a JSON object
 * if there is an error, the message is sent instead
 */

router.delete('/delete/:id', async(req,res)=>{
   try {
      const gardenToDelete = await pool.query("DELETE FROM garden WHERE garden_id = $1 RETURNING *", [req.params.id]);
      res.send(gardenToDelete.rows[0]);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});

module.exports = router;