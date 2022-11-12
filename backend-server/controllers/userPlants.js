const express = require('express');
const router = express.Router();
const {authorizeUser} = require('../custom-middleware/authMiddleware');
const userPlantServices = require('../services/userPlantServices');
/*
router.get('/', async(req, res) => {
   try {
      const allUserPlants = await userPlantServices.getAllUserPlants();
      res.send(allUserPlants);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})
*/
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

router.get('/', authorizeUser, async(req,res)=>{
   const userKey = req.body.user_key; // added by authorizeUser
   try {
      const userPlants = await userPlantServices.getUserPlantsByUserKey(userKey);

      if(!userPlants) return res.sendStatus(500); // need to define more error cases

      res.status(200).send(userPlants);

   } catch (error) {
      console.error(error);
   }
})

router.get('/:key', async(req, res) => {
   try {
      const userPlant = await userPlantServices.getUserPlantByKey(req.params.key);
      res.send(userPlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
}) 

// by user key
router.get('/getByUserKey/:key', async(req, res) => {
   try {
      const userPlants = userPlantServices.getUserPlantsByUserKey(req.params.key);
      res.send(userPlants);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
});

// by garden key
router.get('/getByUser/:key', async(req, res)=>{
   try {
      const userPlants = userPlantServices.getUserPlantsByGardenKey(req.params.key);
      res.send(userPlants);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
})

router.post('/store', async(req,res) =>{
   try {
      const storedUserPlant = await userPlantServices.storeUserPlant(req.body);
      res.send(storedUserPlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.put('/update/:key', async(req,res)=>{
   try {
      const updatedUserPlant = await userPlantServices.updateUserPlant(req.params.key, req.body);
      res.send(updatedUserPlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));   
   }
})

router.put('/updatedifficulty/:key', async(req,res)=>{
   try {
      const updatedUserPlant = await userPlantServices.updateUserPlantDifficulty(req.params.key, req.body);
      res.send(updatedUserPlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));   
   }
})

router.put('/updatequality/:key', async(req,res)=>{
   try {
      const updatedUserPlant = await userPlantServices.updateUserPlantQuality(req.params.key, req.body);
      res.send(updatedUserPlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));   
   }
})

router.delete('/delete/:key', async(req, res)=>{
   try {
      const deletedUserPlant = await userPlantServices.deleteUserPlant(req.params.key);
      res.send(deletedUserPlant);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message)); 
   }
})

module.exports = router;