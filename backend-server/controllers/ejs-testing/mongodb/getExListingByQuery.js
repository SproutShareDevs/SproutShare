/** 
 * Searches the exchangelistings collection for strings matching the regex query string in...
 * ex_plant
 * ex_post_title
 * ex_post_body  
 * Can return multiple records as a collection
 */
const ExchangeListings = require('../../../models/ExchangeListing');

module.exports = async(req, res) => {
   const exchangeListings = await ExchangeListings.find()
   .or([
         {ex_plant:{$regex: req.query.string}}, 
         {ex_post_title: {$regex: req.query.string}},
         {ex_post_body: {$regex: req.query.string}}
      ]);
   console.log(exchangeListings);
   res.render('exchangeListings', {exchangeListings});
}