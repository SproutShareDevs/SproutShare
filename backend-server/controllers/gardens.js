const express = require('express');
const router = express.Router();
const gardenServices = require('../services/gardenServices');

router.get('/', async(req, res) => {
   try {
      const allGardens = await gardenServices.getAllGardens();
      res.send(allGardens);
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
      const singleGarden = await gardenServices.getGardenByKey(req.params.key);
      res.send(singleGarden);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
}) 

router.get('/getByUser/:key', async(req, res)=>{
   try {
      const getGardenByUser = gardenServices.getGardensByUserKey(req.params.key);
      res.send(getGardenByUser);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
})
router.post('/store', async(req,res) =>{
   try {
      const storedGarden = await gardenServices.storeGarden(req.body);
      res.send(storedGarden);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.put('/update/:key', async(req,res)=>{
   try {
      const updatedGarden = await gardenServices.updateGarden(req.params.key, req.body);
      res.send(updatedGarden);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));   
   }
})

router.delete('/delete/:key', async(req, res)=>{
   try {
      const deletedGarden = await gardenServices.deletedGarden(req.params.key);
      res.send(deletedGarden);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message)); 
   }
})

module.exports = router;