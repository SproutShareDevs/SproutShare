/**
 * OpenWeatherMap API configuration values
 */
const constants = {
   openWeatherMap: {
      BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
      SECRET_KEY: "3b1edd015f0c1b3bdcb31a052224b547"
   }
}
const weather = require('openweather-apis');
weather.setAPPID(constants.openWeatherMap.SECRET_KEY);
weather.setUnits('imperial');
weather.setLang('en');

function getWeatherDefault(callback){
   weather.setCity('Virginia Beach');
   weather.getAllWeather(function(err, weatherObj){
      if(err) callback(err);
      callback(weatherObj);
   })
}

function getWeatherByZip(zipcode, callback){
   weather.setZipCode(zipcode);
   weather.getAllWeather(function(err, weatherObj){
      if(err) callback(err);
      console.log(weatherObj);
      callback(weatherObj);
   })
}

module.exports = {
   getWeatherDefault,
   getWeatherByZip
};
