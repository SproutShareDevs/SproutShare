const express = require('express');
const router = express.Router();
const gardenServices = require('../../services/gardenServices');

router.get('/', async(req,res)=>{
   try {
      const gardens = await gardenServices.getAllGardens();
      res.render('gardens', {gardens});
   } catch (error) {
      console.log(error.message);
   }
});

router.get('/key', async(req,res)=>{
   const gardenKey = req.query.key;
   try {
      const gardens = [await gardenServices.getGardenByKey(gardenKey)];
      res.render('gardens', {gardens});
   } catch (error) {
      console.log(error.message);
   }
});

/*
router.get('/search', async(req,res)=>{
   // not implemented yet
});
*/

router.get('/getByUser/key', async(req, res) => {
   const userKey = req.query.key;
   try {
      const gardens = await gardenServices.getGardenByUserKey(userKey);
      res.render('gardens', {gardens});    
   } catch (error) {
      console.error(error);
   }
});

router.post('/store', async(req,res)=>{
   const garden = req.body;
   try {
      await gardenServices.storeGarden(garden);
   } catch (error) { 
      console.log(error.message);
   }
   res.redirect('/ejs-testing/gardens');
});

router.put('/update/:key', async(req,res)=>{
   const gardenKey = req.params.key;
   const garden = req.body;
   try {
      await gardenServices.updateGarden(gardenKey, garden);
      res.status(200).send(`${gardenKey} Successfully Updated`);
   } catch (error) {
      console.log(error.message);
   }
});

router.delete('/delete/:key', async(req,res)=>{
   const gardenKey = req.params.key;
   try {
      await gardenServices.deleteGarden(gardenKey);
   } catch (error) {
      console.log(error.message);
   }
});

module.exports = router;