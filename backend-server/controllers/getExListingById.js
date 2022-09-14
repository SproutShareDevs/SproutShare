const ExchangeListings = require('../models/ExchangeListing');

module.exports = async(req, res)=>{
   const exchangeListings = [await ExchangeListings.findById(req.query.id)];
   console.log(exchangeListings);

   res.render('exchangeListings', {exchangeListings});
}