const ExchangeListing = require('../../models/ExchangeListing');

module.exports = (req, res) => {
   ExchangeListing.create(req.body, (error, exchangeListing)=>{
      console.log(req.body);
      if(error){
         console.error(error);
      }
   });
   res.redirect('/exchangeListings');
}