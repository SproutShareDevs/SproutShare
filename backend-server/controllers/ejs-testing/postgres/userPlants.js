const express = require('express');
const router = express.Router();
const pool = require('../../../models/postgresPool');

const userPlantsList = [
   {
      user_plant_ID: 1,
      user_ID: 'QuirkyUsername1',
      plant_ID: 1,
      garden_ID: 1,
      current_disease: null,
      current_pest: null,
      plant_qty: 1,
      planting_date: {type: Date, default: Date.now()},
      plant_difficulty: 1,
      plant_quality: 1
   },
   {
      user_plant_ID: 2,
      user_ID: 'UnfunnyUsername',
      plant_ID: 2,
      garden_ID: 2,
      current_disease: 4,
      current_pest: 4,
      plant_qty: 3,
      planting_date: {type: Date, default: Date.now()},
      plant_difficulty: 5,
      plant_quality: 3
   }
];

/** 
 * For displaying the user plants page
 * Reads from userPlantsList
 * sends them to ejs for rendering
*/
router.get('/', (req, res)=>{
   //... db call using pool
   const userPlants = [...userPlantsList];
   res.render('userPlants', {userPlants});
});

/** 
 * This route receives user_plant_ID via parameter in the get request and renders it in EJS 
 */
router.get('/id', (req, res)=>{
   const userPlants = userPlantsList.find(p =>{p.user_plant_id === parseInt(req.query.id)});

   if(!userPlants) return res.status(404).send(`No User Plant with ID ${req.query.id} found`);

   res.render('userPlants', {userPlants});
});

router.get('/query', async(req,res)=>{
   //... db call using pool
   // not implemented yet
});

router.post('/store', async(req,res)=>{
   //... db call using pool
   const userPlants = {
      user_plant_ID: req.body.user_plant_ID || userPlantsList.length + 1,
      user_ID: req.body.user_ID,
      plant_ID: req.body.plant_ID,
      garden_ID: req.body.garden_ID,
      current_disease: req.body.current_disease,
      current_pest: req.body.current_pest,
      plant_qty: req.body.plant_qty,
      planting_date: req.body.planting_date,
      plant_difficulty: req.body.plant_difficulty,
      plant_quality: req.body.plant_quality
   }
   userPlantsList.push(userPlants);
   res.redirect('/ejs-testing/userPlants');
});

router.put('/update/:id', async(req,res)=>{
   //... db call using pool
   const userPlants = userPlantsList.find(p => p.user_plant_ID === parseInt(req.params.id));
   
   if(!userPlants) return res.status(404).send(`No User Plant with the ID ${req.params.id} found`);

   
   for(let userPlant of userPlantsList){
      // this assumes id uniqueness is strictly enforced!
      if (userPlant.user_plant_ID === parseInt(req.params.id)){ 
         userPlant.user_ID = req.body.user_ID,
         userPlant.plant_ID = req.body.plant_ID,
         userPlant.garden_ID = req.body.garden_ID,
         userPlant.current_disease = req.body.current_disease,
         userPlant.current_pest = req.body.current_pest,
         userPlant.plant_qty = req.body.plant_qty,
         userPlant.planting_date = req.body.planting_date,
         userPlant.plant_difficulty = req.body.plant_difficulty,
         userPlant.plant_quality = req.body.plant_quality
      }  
   }
   res.send(userPlants);
});

router.delete('/delete/:id', async(req,res)=>{
   //... db call using pool
   const userPlants = userPlantsList.find(p => p.user_plant_ID === parseInt(req.params.id));
   
   if(!userPlants) return res.status(404).send(`No plant with the ID ${req.params.id} found`);

   const index = userPlantsList.indexOf(userPlants);
   userPlantsList.splice(index, 1);
   res.redirect('/ejs-testing/userPlants');
});

module.exports = router;