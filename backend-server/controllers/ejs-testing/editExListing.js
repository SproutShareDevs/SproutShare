const ExchangeListings = require('../../models/ExchangeListing');

module.exports = async(req, res)=>{
   const exchangeListing = await ExchangeListings.findByIdAndUpdate(req.params.id, {...req.body});
   console.log(exchangeListing);
   res.redirect('/exchangeListing');
};