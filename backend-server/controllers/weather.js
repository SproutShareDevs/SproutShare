const express = require('express');
const router = express.Router();
const weatherServices = require('../services/weatherServices');

/**
 * Sends zipcode to weatherServices.getWeatherByZip and gets a formatted weather object back
 */

 router.get('/:zipcode', (req, res)=>{
   try {
      weatherServices.getWeatherByZip(req.params.zipcode, (weatherByZip)=>{
         res.send(weatherByZip);
      });
   } catch (error) {
      console.error(error);
   }
   
});

module.exports = router;