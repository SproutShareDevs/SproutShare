/** 
 * Route handling for the exchange listing page 
 * Gets all exchange listings
 * renders them with ejs
 */
const ExchangeListings = require('../../../models/ExchangeListing');

module.exports = async(req, res) => {
   const exchangeListings = await ExchangeListings.find({});
   res.render('exchangeListings', {exchangeListings});
}