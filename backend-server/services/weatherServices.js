/**
 * OpenWeatherMap API configuration values
 */
const weather = require('openweather-apis');

const constants = {
   openWeatherMap: {
       BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
       SECRET_KEY: "3b1edd015f0c1b3bdcb31a052224b547"
   }
}

function getWeather(callback){
   weather.setCity('Virginia Beach');
   weather.setAPPID(constants.openWeatherMap.SECRET_KEY);
   weather.setUnits('imperial');
   weather.getAllWeather(function(err, rtn){
      if(err) callback(err);

      callback(rtn);
   });
}

function getWeatherByZip(zipcode, callback){
   weather.setZipCode(zipcode);
   weather.setAPPID(constants.openWeatherMap.SECRET_KEY);
   weather.setUnits('imperial');
   weather.getAllWeather(function(err, rtn){
      if(err) callback(err);
      callback(rtn);
   })
}

module.exports = {
   getWeather,
   getWeatherByZip
}