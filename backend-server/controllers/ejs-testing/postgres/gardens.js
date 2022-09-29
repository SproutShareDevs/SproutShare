const express = require('express');
const router = express.Router();
const pool = require('../../../models/postgresPool');

const gardensList = [
   {
      garden_ID: 1,
      user_ID: 'QuirkyUsername1',
      light_level: 5,
      soil: 1
   },
   {
      garden_ID: 3,
      user_ID: 'UnfunnyUsername',
      light_level: 3,
      soil: 55
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
   res.render('gardens', {gardens});
});

/** 
 * This route receives garden_ID via parameter in the get request and renders it in EJS 
 */
router.get('/id', (req, res)=>{
   const gardens = gardensList.find(g =>g.garden_ID === parseInt(req.query.id));

   if(!gardens) return res.status(404).send(`No Garden with ID ${req.query.id} found`);

   res.render('gardens', {gardens});
});

router.get('/query', async(req,res)=>{
   //... db call using pool
   // not implemented yet
});

router.post('/store', async(req,res)=>{
   //... db call using pool
   const gardens = {
      garden_ID: req.body.garden_ID || gardensList.length + 1,
      user_ID: req.body.user_ID,
      light_level: req.body.light_level,
      soil: req.body.soil
   }
   gardensList.push(gardens);
   res.redirect('/ejs-testing/gardens');
});

router.put('/update/:id', async(req,res)=>{
   //... db call using pool
   const gardens = gardensList.find(g =>{g.garden_ID === parseInt(req.params.id)});
   
   if(!gardens) return res.status(404).send(`No garden with the ID ${req.params.id} found`);

   
   for(let garden of gardensList){
      // this assumes id uniqueness is strictly enforced!
      if (garden.garden_ID === parseInt(req.params.id)){ 
         garden.user_ID = req.body.user_ID,
         garden.light_level = req.body.light_level,
         garden.soil = req.body.soil
      }  
   }
   res.send(gardens);
});

router.delete('/delete/:id', async(req,res)=>{
   //... db call using pool
   const gardens = gardensList.find(g =>g.garden_ID === parseInt(req.params.id));
   
   if(!gardens) return res.status(404).send(`No garden with the ID ${req.params.id} found`);

   const index = gardensList.indexOf(gardens);
   gardensList.splice(index, 1);
   res.redirect('/ejs-testing/gardens');
});

module.exports = router;