const express = require('express');
const router = express.Router();
const exListingServices = require('../services/exListingServices');

router.get('/', async(req, res) => {
   try {
      const allListings = await exListingServices.getAllListings();
      res.send(allListings);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.get('/search', async(req, res) =>{
   try {
      const exListings = await exListingServices.getListingsByQuery({$regex:req.query.string});
      res.send(exListings);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.get('/:id', async(req, res) => {
   try {
      const exListing = await exListingServices.getListingById(req.params.id);
      res.send(exListing);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
}) 

router.post('/store', async(req,res) =>{
   try {
      const storedListing = await exListingServices.storeListing(req.body);
      res.send(storedListing);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));
   }
})

router.put('/update/:id', async(req,res)=>{
   try {
      const updatedExListing = await exListingServices.updateListing(req.params.id, req.body);
      res.send(updatedExListing);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message));   
   }
})

router.delete('/delete/:id', async(req, res)=>{
   try {
      const deletedExListing = await exListingServices.deleteListing(req.params.id);
      res.send(deletedExListing);
   } catch (error) {
      console.error(error);
      res.send(JSON.stringify(error.message)); 
   }
})

module.exports = router;