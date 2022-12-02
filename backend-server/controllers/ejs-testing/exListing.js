const express = require('express');
const router = express.Router();
const exListingServices = require('../../services/exListingServices');
const upload = require('../../custom-middleware/upload');

router.get('/', async(req, res) => {
   try {
      const exListings = await exListingServices.getAllListings();
      res.render('exchangeListings', {exListings});
   } catch (error) {
      console.error(error);
   }
})

router.get('/id', async(req, res) => {
   const listingId = req.query.id;
   try {
      const exListings = [await exListingServices.getListingById(listingId)];
      res.render('exchangeListings', {exListings});
   } catch (error) {
      console.error(error);   
   }
}) 

router.get('/search', async(req, res) =>{   
   const query = {$regex:req.query.string};
   try {
      const exListings = await exListingServices.getListingsByQuery(query);
      res.render('exchangeListings', {exListings});
   } catch (error) {
      console.error(error);
   }
})

router.post('/store',upload.single('listing'), async(req,res) =>{
   const listing = req.body;
   try {
      await exListingServices.storeListing(listing);
      res.redirect('/ejs-testing/exchangeListings');
   } catch (error) {
      console.error(error);
   }
})

router.put('/update/:id', async(req,res)=>{
   const listingBody = req.body;
   const listingId = req.params.id;
   try {
      await exListingServices.updateListing(listingId, listingBody);
      return res.status(200).send(`${listingId} Successfully Updated`);
   } catch (error) {
      console.error(error);
   }
   //res.redirect('/ejs-testing/exchangeListings');
})

router.delete('/delete/:id', async(req, res)=>{
   const listingId = req.params.id;
   try {
      await exListingServices.deleteListing(listingId);
      res.redirect('/ejs-testing/exchangeListings');
   } catch (error) {
      console.error(error);
   }
   //res.redirect('/ejs-testing/exchangeListings');
})

module.exports = router;