const express = require('express');
const router = express.Router();
const weatherServices = require('../../services/weatherServices');


router.get('/', (req, res)=>{
   try {
      weatherServices.getWeatherDefault((weather)=>{
         res.render('weather', {weather});
      });
   } catch (error) {
      console.error(error);
   }
})

/**
 * Sends zipcode to weatherServices.getWeatherByZip and gets a formatted weather object back
 */

router.get('/zipcode', (req, res)=>{
   try {
      weatherServices.getWeatherByZip(req.query.zipcode, (weatherByZip)=>{
         res.render('weather', {weatherByZip});
      });
   } catch (error) {
      console.error(error);
   }
   
});

router.get('/3dayforcast', (req, res)=>{
   try {
      weatherServices.getWeather3DayForcast(req.query.zipcode, (curr3DayForcast)=>{
         res.render('weather', {curr3DayForcast});
      });
   } catch (error) {
      console.log(error);
   }
})

module.exports = router;