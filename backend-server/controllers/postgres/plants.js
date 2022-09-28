const express = require('express');
const router = express.Router();
const pool = require('../../models/postgresPool');

// temporary data
const plantsList = [
   {
      plant_id: 1,
      common_name: "daisy",
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
      common_name: "lily",
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
      plant_id:3,
      common_name:'Tomato',
      latin_name: 'Solanum Lycopersicum',
      light_level: '10',
      min_temp: 55,
      max_temp: 90,
      rec_temp: 80,
      hardiness_zone: "TYPE_C",
      soil_type: "TYPE_C",
      image: "https://images.unsplash.com/photo-1588230737595-d49e490bff1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
   },
   {
      plant_id:4,
      common_name:'Zucchini',
      latin_name: 'Cucurbita pepo',
      light_level: '10',
      min_temp: 55,
      max_temp: 90,
      rec_temp: 75,
      hardiness_zone: "TYPE_D",
      soil_type: "TYPE_D",
      image: "https://images.unsplash.com/photo-1588230737595-d49e490bff1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
   }
];

router.get('/', (req,res)=>{
   //... db call using pool
   res.send(plantsList);
});

router.get('/:id', async(req,res)=>{
   //... db call using pool
   const plant = plantsList.find(p => p.plant_id === parseInt(req.params.id));
   
   if(!plant) return res.status(404).send(`No plant with the ID ${req.params.id} found`);
   
   res.send(plant);

});

router.get('/query', async(req,res)=>{
   //... db call using pool
   // not implemented yet
});

router.post('/store', async(req,res)=>{
   //... db call using pool
   const plant = {
      plant_id: req.body.id || plantsList.length + 1,
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
   plantsList.push(plant);
   res.send(plant)
});

router.put('/update/:id', async(req,res)=>{
   //... db call using pool
   const plant = plantsList.find(p => p.plant_id === parseInt(req.params.id));
   
   if(!plant) return res.status(404).send(`No plant with the ID ${req.params.id} found`);

   for(let plant of plantsList){
      // this assumes id uniqueness is strictly enforced!
      if (plant.plant_id === parseInt(req.params.id)){ 
         plant.common_name = req.body.common_name,
         plant.latin_name = req.body.latin_name,
         plant.light_level = req.body.light_level, 
         plant.min_temp = req.body.min_temp, 
         plant.max_temp = req.body.max_temp, 
         plant.rec_temp = req.body.rec_temp, 
         plant.hardiness_zone = req.body.hardiness_zone, 
         plant.soil_type = req.body.soil_type 
         plant.image = req.body.image
      }  
   }
   res.send(plant);
});

router.delete('/delete/:id', async(req,res)=>{
   //... db call using pool
   const plant = plantsList.find(p => p.plant_id === parseInt(req.params.id));
   
   if(!plant) return res.status(404).send(`No plant with the ID ${req.params.id} found`);

   const index = plantsList.indexOf(plant);
   plantsList.splice(index, 1);
   res.send(plant);
});

module.exports = router;