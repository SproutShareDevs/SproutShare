const express = require('express');
const router = express.Router();
const pool = require('../../models/postgresPool');

const gardensList = [
   {
      garden_ID: 1,
      user_ID: 'Erik',
      light_level: 5,
      soil: 'clay'
   },
   {
      garden_ID: 2,
      user_ID: 'Erik',
      light_level: 3,
      soil: 'sand'
   }
];

/** 
 * For displaying the garden page
 * Reads from 
 * sends them to ejs for rendering
*/
router.get('/', (req, res)=>{
   //... db call using pool
   const gardens = [...gardensList];
   res.send(gardens);
});

/** 
 * This route receives garden_ID via parameter in the get request and renders it in EJS 
 */
router.get('/:id', (req, res)=>{
   const garden = gardensList.find(g =>g.garden_ID === parseInt(req.params.id));

   if(!garden) return res.status(404).send(`No Garden with ID ${req.params.id} found`);

   res.send(garden);
});

router.get('/query', async(req,res)=>{
   //... db call using pool
   // not implemented yet
});

router.post('/store', async(req,res)=>{
   //... db call using pool
   const garden = {
      garden_ID: req.body.garden_ID || gardensList.length + 1,
      user_ID: req.body.user_ID,
      light_level: req.body.light_level,
      soil: req.body.soil
   }
   gardensList.push(garden);
   res.send(garden);
});

router.put('/update/:id', async(req,res)=>{
   //... db call using pool
   const garden = gardensList.find(g =>g.garden_ID === parseInt(req.params.id));
   
   if(!garden) return res.status(404).send(`No garden with the ID ${req.params.id} found`);

   
   for(let garden of gardensList){
      // this assumes id uniqueness is strictly enforced!
      if (garden.garden_ID === parseInt(req.params.id)){ 
         garden.user_ID = req.body.user_ID,
         garden.light_level = req.body.light_level,
         garden.soil = req.body.soil
      }  
   }
   res.send(garden);
});
/**
 * Finds the garden in gardensList
 * 
 */
router.delete('/delete/:id', async(req,res)=>{
   //... db call using pool
   const garden = gardensList.find(g =>g.garden_ID === parseInt(req.params.id));
   
   if(!garden) return res.status(404).send(`No garden with the ID ${req.params.id} found`);

   const index = gardensList.indexOf(garden);
   gardensList.splice(index, 1);
   res.send(garden);
});

module.exports = router;