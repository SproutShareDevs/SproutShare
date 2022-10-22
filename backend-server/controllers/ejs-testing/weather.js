const express = require('express');
const router = express.Router();
const weatherServices = require('../../services/weatherServices');

router.get('/', (req, res)=>{
   weatherServices.getWeather((weather)=>{
      //console.log(weather);
      res.render('weather', {weather});
   });
})

router.get('/zipcode', (req, res)=>{
   weatherServices.getWeatherByZip(req.query.zipcode, (weather)=>{
      res.render('weather', {weather});
   });
})

module.exports = router;