const express = require('express');
const { authorizeUser } = require('../../custom-middleware/authMiddleware');
const router = express.Router();
const userPlantServices = require('../../services/userPlantServices');


router.get('/', async(req,res)=>{
   try {
      const userPlants = await userPlantServices.getAllUserPlants();
      res.render('userPlants', {userPlants});
   } catch (error) {
      console.log(error.message);
   }
});

/* Buggy, do not enable
router.get('/', authorizeUser, async(req,res)=>{
   const userKey = req.body.user_key;
   console.log(userKey);
   try {
      const userPlants = await userPlantServices.getUserPlantsByUserKey(userKey);
      console.log('in controller: ', userPlants);
      res.render('userPlants', {userPlants});
   } catch (error) {
      console.error(error);
   }
})
*/
router.get('/key', async(req,res)=>{
   const userPlantKey = req.query.key;
   try {
      const userPlants = [await userPlantServices.getUserPlantByKey(userPlantKey)];
      res.render('userPlants', {userPlants});
   } catch (error) {
      console.log(error.message);
   }
});

/*
router.get('/search', async(req,res)=>{
   // not implemented yet
});
*/


router.get('/getByGarden/key', async(req,res)=>{
   const gardenKey = req.query.key;
   try {
      const userPlants = await userPlantServices.getUserPlantByGardenKey(gardenKey);
      res.render('userPlants', {userPlants});
   } catch (error) {
      console.log(error.message);
   }
});

// Recommend plants by zip code
router.get('/recommend/:zipcode', async(req, res)=>{
   try {
      const plantsMap = userPlantServices.getRecommendedPlants(req.params.zipcode);
	  console.log("Hi");
      res.render(plantsMap);
   } catch (error) {
      res.send(JSON.stringify(error.message));
   }
})

router.post('/store', async(req,res)=>{
   const userPlant = req.body;
   console.log(userPlant);
   try {
      await userPlantServices.storeUserPlant(userPlant);
   } catch (error) {
      console.log(error.message);
   }
   res.redirect('/ejs-testing/userPlants');
});

router.put('/update/:key', async(req,res)=>{
   const userPlantKey = req.params.key;
   const userPlant = req.body;
   try {
      await userPlantServices.updateUserPlant(userPlantKey, userPlant);
      res.status(200).send(`${userPlantKey} Successfully Updated`);
   } catch (error) {
      console.log(error.message);
   }
});

router.delete('/delete/:key', async(req,res)=>{
   const userPlantKey = req.params.key;
   try {
      await userPlantServices.deleteUserPlant(userPlantKey);
   } catch (error) {
      console.log(error.message);
   }
});

module.exports = router;