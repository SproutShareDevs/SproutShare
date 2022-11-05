const express = require('express');
const router = express.Router();
const plantServices = require('../services/plantServices');

router.get('/', async(req, res) => {
   try {
      const allPlants = await plantServices.getAllPlants();
      res.send(allPlants);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})
/*
router.get('/search', async(req, res) =>{
   
   const query = {$regex:req.query.string};
   try {
      const notifications = await gardenServices.getNotificationByQuery(query);
      res.send(notifications);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})
*/

router.get('/:key', async(req, res) => {
   try {
      const singlePlant = await plantServices.getPlantByKey(req.params.key);
      res.send(singlePlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
}) 

router.post('/store', async(req,res) =>{
   try {
      const storedPlant = await plantServices.storePlant(req.body);
      res.send(storedPlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.put('/update/:key', async(req,res)=>{
   try {
      const updatedPlant = await plantServices.updatePlant(req.params.key, req.body);
      res.send(updatedPlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));   
   }
})

router.delete('/delete/:key', async(req, res)=>{
   try {
      const deletedPlant = await plantServices.deletedGarden(req.params.key);
      res.send(deletedPlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message)); 
   }
})

module.exports = router;