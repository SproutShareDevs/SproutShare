const express = require('express');
const router = express.Router();
const ExchangeListings = require('../../models/ExchangeListing');

/** 
 * For displaying the community post page
 * Queries the CommunityPost collection
 * retrieves all documents
 * sends them to ejs for rendering
*/
router.get('/', async(req, res) => {
   const exchangeListings = await ExchangeListings.find({});
   res.send(exchangeListings);
})

/** 
 * This route gets a community post ID via parameter in the get request and renders it in EJS 
 */
router.get('/:id', async(req, res) => {
   const exchangeListing = await ExchangeListings.findById(req.params.id);
   res.send(exchangeListing);
}) 

/** 
 * Searches the ExchangeListings collection for strings matching the regex query string in...
 * ex_plant
 * ex_post_title
 * ex_post_body
 * Can return multiple records as a collection
 */
router.get('/search', async(req, res) =>{
    const exchangeListings = await ExchangeListings.find()
    .or(
          [
            {ex_plant: {$regex:req.query.string}}, 
            {ex_post_title: {$regex:req.query.string}}, 
            {ex_post_body: {$regex:req.query.string}}
          ]
    );
    res.send(exchangeListings);
})

/** Handler for creating a community post */
router.post('/store', (req,res) =>{
   ExchangeListings.create(req.body);
   res.send(req.body);
})
/**
 *  Updates a document in the ExchangeListings collection in mongodb
 */
router.put('/update/:id', async(req,res)=>{
   const exchangeListing = await ExchangeListings.findByIdAndUpdate(req.params.id, {...req.body});
   res.send(exchangeListing);
})

/**
 * Deletes a document in the ExchangeListings collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to ExchangeListings page
 */
router.delete('/delete/:id', async(req, res)=>{
    const exchangeListing = await ExchangeListings.findByIdAndDelete(req.params.id);  
    res.send(exchangeListing);
})

module.exports = router;