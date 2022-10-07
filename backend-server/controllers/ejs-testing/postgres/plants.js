const express = require('express');
const router = express.Router();
const pool = require('../../../models/postgresPool');
/*
// temporary data
const plantList = [
   {
      plant_id: 1,
      common_name: "some name",
      latin_name: "lorem",
      light_level: "5", 
      min_temp: 32, 
      max_temp: 70, 
      rec_temp: 52, 
      hardiness_zone: "ZONE_A", 
      soil_type: "TYPE_A",
      image: "https://images.unsplash.com/photo-1588230737595-d49e490bff1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
   },
   {
      plant_id: 2, 
      common_name: "a name",
      latin_name: "ipsum",
      light_level: "10", 
      min_temp: 0, 
      max_temp: 120, 
      rec_temp: 80, 
      hardiness_zone: "ZONE_B", 
      soil_type: "TYPE_B", 
      image: "https://images.unsplash.com/photo-1588230737595-d49e490bff1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
   },
   {
      plant_id: 3,
      common_name: "Tomato",
      latin_name: "Solanum lycopersicum",
      light_level: "5", 
      min_temp: 32, 
      max_temp: 85, 
      rec_temp: 70, 
      hardiness_zone: "ZONE_A", 
      soil_type: "TYPE_A",
      image: "https://images.unsplash.com/photo-1588230737595-d49e490bff1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
   }
];

replaces the above temp data in the database
run as a command when connected to the db psql
INSERT INTO plant (common_name, latin_name, light_level, 
min_temp, max_temp, rec_temp, hardiness_zone, soil_type, img)
VALUES
   ('some name', 'lorem', '5', 32, 70, 52, "ZONE_A", "TYPE_A", "https://images.unsplash.com/photo-1588230737595-d49e490bff1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"),
   ("a name", "ipsum", "10", 0, 120, 80, "ZONE_B", "TYPE_B", "https://images.unsplash.com/photo-1588230737595-d49e490bff1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"),
   ("Tomato", "Solanum lycopersicum", "5", 32, 85, 70, "ZONE_A", "TYPE_A", "https://images.unsplash.com/photo-1588230737595-d49e490bff1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80");
*/


/** 
 * For displaying the plants page
 * Reads from plant table and retrieves all records
 * sends them to ejs for rendering
 * If an error occurs, redirect to plants ejs page and output error on console
*/

router.get('/', async(req,res)=>{
   try {
      const getAllPlants = await pool.query("SELECT * FROM plant");
      const plants = getAllPlants.rows;
      res.render('plants', {plants});
   } catch (error) {
      console.log(error.message);
      res.redirect('/ejs-testing/plants');
   }
});

/** 
 * For displaying a single plant based on plant_key
 * Retrieves the row in plant with the passed plant_key
 * renders the ejs page plants with the retrieved row
 * If an error occurs, redirect to plants ejs page and output error on console
 */

router.get('/id', async(req,res)=>{
   const plant_key = req.query.id;
   try {
      const getPlantByKey = await pool.query("SELECT * FROM plant WHERE plant_key = $1", [plant_key]);
      const plants = getPlantByKey.rows[0];
      res.render('plants', {plants});
   } catch (error) {
      console.log(error.message);
      res.redirect('/ejs-testing/plants');
   }
});

router.get('/query', async(req,res)=>{
   //... db call using pool
   // not implemented yet
});

/**
 * Inserts a record into the plant table
 * The body of the request is used to create the insert statement
 * on success the page redirects
 * on error the error is logged in the console and the page is redirected 
 */
router.post('/store', async(req,res)=>{
   const r = req.body;
   try {
      const plantToInsert = await pool.query(
         'INSERT INTO plant (common_name, latin_name, light_level, min_temp, max_temp, rec_temp, hardiness_zone, soil_type, img) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
         [r.common_name, r.latin_name, r.light_level, r.min_temp, r.max_temp, r.rec_temp, r.hardiness_zone, r.soil_type, r.img]);
   } catch (error) {
      console.log(error.message);
   }
   res.redirect('/ejs-testing/plants');
});

/**
 * This route updates a record in the plant table
 * the plant_key is used to find the record
 * req.body is used to update the record
 * if successful the response is sent back as a JSON object
 * if error the error is logged on the console and the response is returned as an empty JSON object 
 */

router.put('/update/:id', async(req,res)=>{
   const plant_key = req.params.id;
   const r = req.body;
   try {
      const plantToUpdate = await pool.query(
      'UPDATE plant SET common_name= $1, latin_name = $2 , light_level = $3, min_temp = $4, max_temp =$5, rec_temp = $6, hardiness_zone = $7, soil_type = $8, img = $9) WHERE plant_key = $10',
      [r.common_name, r.latin_name, r.light_level, r.min_temp, r.max_temp, r.rec_temp, r.hardiness_zone, r.soil_type, r.img]);
   } catch (error) {
      console.log(error.message);
   }
   res.send(plants);
});

/**
 * This route deletes a record from the plant table
 * the record to delete is given by the plant_key
 * if successful the response is a redirect
 * if error the error is logged on the console and the response is a redirect
 */
router.delete('/delete/:id', async(req,res)=>{
   const plant_key = req.params.id;
   try {
      const plantToDelete = pool.query("DELETE FROM plant WHERE plant_key = $1", [plant_key]);
   } catch (error) {
      console.log(error.message);
   }
   res.redirect('/ejs-testing/plants');
});

module.exports = router;