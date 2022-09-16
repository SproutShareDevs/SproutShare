/**
 * Deletes a document in the exchangelistings collection
 * based on _id passed from req.params
 * console logs the deleted record and redirects to exchangeListings page
 */
const ExchangeListings = require('../models/ExchangeListing');

module.exports = async(req, res)=>{
   const exchangeListing = await ExchangeListings.findByIdAndDelete(req.params.id);
   console.log(exchangeListing);
   res.redirect('/exchangeListings');
}