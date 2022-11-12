/**
 * OpenWeatherMap API configuration values
 */
const https = require("https");
const constants = {
   openWeatherMap: {
      BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
      SECRET_KEY: "3b1edd015f0c1b3bdcb31a052224b547",
      COUNTRY_CODE: "us",
      DAILY_URL: "https://api.openweathermap.org/data/2.5/forecast/daily?"
   }
}
const weather = require('openweather-apis');
weather.setAPPID(constants.openWeatherMap.SECRET_KEY);
weather.setUnits('imperial');
weather.setLang('en');

function getWeatherDefault(callback){
   weather.setZipCode('23669');
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
function getWeather3DayForecast(zipcode,callback){
   let api = constants.openWeatherMap.DAILY_URL+"zip="+zipcode+","+constants.openWeatherMap.COUNTRY_CODE+"&appid="+constants.openWeatherMap.SECRET_KEY;
   https.get(api, function (response){
      console.log(response.statusCode);
      response.on("data", function(data){
         const weatherData = JSON.parse(data);
         console.log(weatherData.list[1].weather[0].main);
         callback(weatherData);
      })
   });
}
module.exports = {
   getWeatherDefault,
   getWeatherByZip,
   getWeather3DayForecast
};
