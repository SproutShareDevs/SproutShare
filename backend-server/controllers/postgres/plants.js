const express = require('express');
const router = express.Router();
const pool = require('../../models/postgresPool');

// temporary data
const plants = [
   {
      plant_id: 1,
      common_name: "daisy",
      latin_name: "lorem",
      light_level: "5", 
      min_temp: 32, 
      max_temp: 70, 
      rec_temp: 52, 
      hardiness_zone: "ZONE_A", 
      soil_type: "TYPE_A"
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
   }
];

router.get('/', (req,res)=>{
   //... db call using pool
   res.send(plants);
});

router.get('/:id', async(req,res)=>{
   //... db call using pool
   console.log(req.params.id);
   const plant = plants.find(p => p.plant_id === parseInt(req.params.id));
   
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
      plant_id: req.body.id || plants.length + 1,
      common_name: req.body.common_name,
      latin_name: req.body.latin_name,
      light_level: req.body.light_level, 
      min_temp: req.body.min_temp, 
      max_temp: req.body.max_temp, 
      rec_temp: req.body.rec_temp, 
      hardiness_zone: req.body.hardiness_zone, 
      soil_type: req.body.soil_type
   }
   plants.push(plant);
   res.send(plants)
});

router.put('/update/:id', async(req,res)=>{
   //... db call using pool
   const plant = plants.find(p => p.plant_id === parseInt(req.params.id));
   
   if(!plant) return res.status(404).send(`No plant with the ID ${req.params.id} found`);

   for(let plant of plants){
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
      }  
   }
   res.send(plant);
});

router.delete('/delete/:id', async(req,res)=>{
   //... db call using pool
   const plant = plants.find(p => p.plant_id === parseInt(req.params.id));
   
   if(!plant) return res.status(404).send(`No plant with the ID ${req.params.id} found`);

   const index = plants.indexOf(plant);
   plants.splice(index, 1);
   res.send(plant);
});

module.exports = router;