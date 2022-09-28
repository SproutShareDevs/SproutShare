const express = require('express');
const router = express.Router();
const pool = require('../../../models/postgresPool');

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

router.get('/', (req,res)=>{
   //... db call using pool
   const plants = [...plantList];
   res.render('plants', {plants});
});

router.get('/id', async(req,res)=>{
   //... db call using pool
   const plants = plantList.find(p => p.plant_id === parseInt(req.query.id));
   
   if(!plants) return res.status(404).send(`No plant with the ID ${req.query.id} found`);
   console.log(plants);
   res.render('plants', {plants});
});

router.get('/query', async(req,res)=>{
   //... db call using pool
   // not implemented yet
});

router.post('/store', async(req,res)=>{
   //... db call using pool
   const plants = {
      plant_id: req.body.id || plantList.length + 1,
      common_name: req.body.common_name,
      latin_name: req.body.latin_name,
      light_level: req.body.light_level, 
      min_temp: req.body.min_temp, 
      max_temp: req.body.max_temp, 
      rec_temp: req.body.rec_temp, 
      hardiness_zone: req.body.hardiness_zone, 
      soil_type: req.body.soil_type,
      image: req.body.image
   }
   plantList.push(plants);
   res.redirect('/ejs-testing/plants');
});

router.put('/update/:id', async(req,res)=>{
   //... db call using pool
   const plants = plantList.find(p => p.plant_id === parseInt(req.params.id));
   
   if(!plants) return res.status(404).send(`No plant with the ID ${req.params.id} found`);

   for(let plants of plantList){
      // this assumes id uniqueness is strictly enforced!
      if (plants.plant_id === parseInt(req.params.id)){ 
         plants.common_name = req.body.common_name,
         plants.latin_name = req.body.latin_name,
         plants.light_level = req.body.light_level, 
         plants.min_temp = req.body.min_temp, 
         plants.max_temp = req.body.max_temp, 
         plants.rec_temp = req.body.rec_temp, 
         plants.hardiness_zone = req.body.hardiness_zone, 
         plants.soil_type = req.body.soil_type,
         plants.image = req.body.image 
      }  
   }
   res.send(plants);
});

router.delete('/delete/:id', async(req,res)=>{
   //... db call using pool
   const plant = plantList.find(p => p.plant_id === parseInt(req.params.id));
   
   if(!plant) return res.status(404).send(`No plant with the ID ${req.params.id} found`);

   const index = plantList.indexOf(plant);
   plantList.splice(index, 1);
   res.redirect('/ejs-testing/plants');
});

module.exports = router;