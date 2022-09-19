const express = require('express');
const router = express.Router();
const pool = require('../../../models/postgresPool');

// temporary data
const plantTypes = [
   {
      id: 1, 
      light_level: "5", 
      min_temp: 32, 
      max_temp: 70, 
      rec_temp: 52, 
      hardiness_zone: "ZONE_A", 
      soil_type: "TYPE_A", 
      common_disease: "001", 
      common_pest: "001" 
   },
   {
      id: 2, 
      light_level: "10", 
      min_temp: 0, 
      max_temp: 120, 
      rec_temp: 80, 
      hardiness_zone: "ZONE_B", 
      soil_type: "TYPE_B", 
      common_disease: "050", 
      common_pest: "721" 
   },
];

router.get('/', (req,res)=>{
   //... db call using pool
   res.render('plantTypes', {plantTypes});
});

router.get('/:id', async(req,res)=>{
   //... db call using pool
   const plantType = plantTypes.find(p => p.id === parseInt(req.params.id));
   
   if(!plantType) return res.status(404).send(`No plant type with the ID ${req.params.id} found`);
   
   res.send(plantType);

});

router.get('/query', async(req,res)=>{
   //... db call using pool
});

router.post('/store', async(req,res)=>{
   //... db call using pool
   const plantType = {
      id: req.body.id || plantTypes.length + 1,
      light_level: req.body.light_level, 
      min_temp: req.body.min_temp, 
      max_temp: req.body.max_temp, 
      rec_temp: req.body.rec_temp, 
      hardiness_zone: req.body.hardiness_zone, 
      soil_type: req.body.soil_type, 
      common_disease: req.body.common_disease, 
      common_pest: req.body.common_pest 
   }
});

router.put('/:id', async(req,res)=>{
   //... db call using pool
   const plantType = plantTypes.find(p => p.id === parseInt(req.params.id));
   
   if(!plantType) return res.status(404).send(`No plant type with the ID ${req.params.id} found`);

   for(let type of plantTypes){
      // this assumes id uniqueness is strictly enforced!
      if (type.id === parseInt(req.params.id)){ 
         type.light_level = req.body.light_level, 
         type.min_temp = req.body.min_temp, 
         type.max_temp = req.body.max_temp, 
         type.rec_temp = req.body.rec_temp, 
         type.hardiness_zone = req.body.hardiness_zone, 
         type.soil_type = req.body.soil_type, 
         type.common_disease = req.body.common_disease, 
         type.common_pest = req.body.common_pest 
      }  
   }
   res.send(plantType);
});

router.delete('/delete/:id', async(req,res)=>{
   //... db call using pool
   const plantType = plantTypes.find(p => p.id === parseInt(req.params.id));
   
   if(!plantType) return res.status(404).send(`No plant type with the ID ${req.params.id} found`);

   const index = plantTypes.indexOf(plantType);
   plantTypes.splice(index, 1);
   res.send(plantType);
});

module.exports = router;