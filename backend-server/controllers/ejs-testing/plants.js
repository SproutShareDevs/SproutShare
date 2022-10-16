const express = require('express');
const router = express.Router();
const plantServices = require('../../services/plantServices');

router.get('/', async(req,res)=>{
   try {
      const plants = await plantServices.getAllPlants();
      res.render('plants', {plants});
   } catch (error) {
      console.log(error.message);
   }
});

router.get('/key', async(req,res)=>{
   const plantKey = req.query.key;
   try {
      const plants = [await plantServices.getPlantByKey(plantKey)];
      res.render('plants', {plants});
   } catch (error) {
      console.log(error.message);
   }
});

/*
router.get('/search', async(req,res)=>{
   // not implemented yet
});
*/

router.post('/store', async(req,res)=>{
   const plant = req.body;
   try {
      await plantServices.storePlant(plant);
   } catch (error) {
      console.log(error.message);
   }
   res.redirect('/ejs-testing/plants');
});

router.put('/update/:key', async(req,res)=>{
   const plantKey = req.params.key;
   const plant = req.body;
   try {
      await plantServices.updatePlant(plantKey, plant);
      res.status(200).send(`${plantKey} Successfully Updated`);
   } catch (error) {
      console.log(error.message);
   }
});

router.delete('/delete/:key', async(req,res)=>{
   const plantKey = req.params.key;
   try {
      await plantServices.deletePlant(plantKey);
   } catch (error) {
      console.log(error.message);
   }
});

module.exports = router;