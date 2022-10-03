const express = require('express');
const router = express.Router();
const pool = require('../../../models/postgresPool');


/** 
 * For displaying the garden page
 * Reads from 
 * sends them to ejs for rendering
*/
router.get('/', async(req, res)=>{
   const getAllGardens = await pool.query("SELECT * FROM garden");
   gardens = getAllGardens.rows;
   res.render('gardens', {gardens});
});

/** 
 * This route receives garden_id via parameter in the get request and renders it in EJS 
 */
router.get('/id', async(req, res)=>{
   const id = req.query.id;
   const getGardenById = await pool.query("SELECT * FROM garden WHERE garden_id = $1", [id]);
   const gardens = getGardenById.rows;
   res.render('gardens', {gardens}); 
});

/**
 * this route retrieves either a collection or a single garden
 * the garden(s) to send are requested via the user_id
 * queries the garden table
 * renders the view with the found row
 * if there is an error, redirect to the garden page
 */

 router.get('/getByUser/id', async(req, res)=>{
   try {
      const getGardenByUser = await pool.query("SELECT * FROM garden WHERE user_id = $1", [req.query.id]);
      res.render('gardens', {getGardenByUser});
   } catch (error) {
      res.redirect('/ejs-testing/gardens');
   }
})

/**
 * This route can be used to find a users garden by users first name (partial match too)
 * does not work, but also will not crash the ejs page
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
   /*const getGardenBySearch = await pool.query(
      "SELECT * FROM garden WHERE user_id IN (SELECT user_id FROM sproutshareuser WHERE first_name LIKE '%$1%')", 
      [firstName]
   );*/
   //const gardens = getGardenBySearch.rows;
   res.render('gardens');
});

/**
 * Creates an entry in the garden table using req.body
 */

router.post('/store', async(req,res)=>{
   try {
      const gardenToInsert = await pool.query("INSERT INTO garden(user_id, soil_id, light_level) VALUES ($1, $2, $3) RETURNING *", 
      [req.body.user_id, req.body.soil_id, req.body.light_level]);
   } catch (error) {
      console.log(error.message);
   }
   res.redirect('/ejs-testing/gardens');   
});

/**
 * This route takes a garden_id as a route parameter (req.params.id) and updates that garden using information
 * passed in req.body
 * not functional in ejs at this time, to test use postman or similar
 */
router.put('/update/:id', async(req,res)=>{
   try {
      const gardenToUpdate = await pool.query("UPDATE garden SET user_id = $1, soil_id = $2, light_level = $3 WHERE garden_id = $4 RETURNING *", 
      [req.body.user_id, req.body.soil_id, req.body.light_level, req.params.id]);
   return res.send(gardenToUpdate.rows);
   } catch (error) {
      console.log(error.message);
   }
   res.send(`Could not edit garden ${req.params.id}`);
   //res.redirect('/ejs-testing/garden');
});

router.delete('/delete/:id', async(req,res)=>{
   try {
      const gardenToDelete = await pool.query("DELETE FROM garden WHERE garden_id = $1 RETURNING *", [req.params.id]);
   } catch (error) {
      console.log(error.message);
   }
   res.redirect('/ejs-testing/gardens');   
});

module.exports = router;