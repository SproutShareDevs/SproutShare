
const weatherAPI = require('../openweather/openweatherapi');

function getWeatherDefault(callback){
   weatherAPI.getWeatherDefault((weatherObj)=>{
      callback(weatherObj)
   })
}

function getWeatherByZip(zipcode, callback){
   let weatherByZip;
   weatherAPI.getWeatherByZip(zipcode, (weatherObj)=>{
      const formattedDate = formatDate(weatherObj.dt);
      weatherByZip = {
         cityName:weatherObj.name,
         clientDate:formattedDate,
         currentTemp:weatherObj.main.temp,
         lowTemp:weatherObj.main.temp_min,
         maxTemp:weatherObj.main.temp_max,
         weatherId:weatherObj.weather[0].id,
         weatherMain:weatherObj.weather[0].main,
         weatherDescription:weatherObj.weather[0].description,
         weatherIcon:weatherObj.weather[0].icon
      }
      callback(weatherByZip);
   })
}

/**
 * 
 * @param {*} date The OpenWeatherAPI datetime parameter 
 * @returns A date string as a Template string formatted to Month dd, yyyy
 */
function formatDate(date){
   const UTC_TO_JS_TIME = 1000; // constant to convert unix time to JS time (milliseconds)
   newDate = new Date(date * UTC_TO_JS_TIME);
      const [month, day, year] = [
         newDate.toLocaleString('default', {month:'long'}), 
         newDate.getDate(), 
         newDate.getFullYear()
      ];
   return `${month} ${day}, ${year}`; 
}

module.exports = {
   getWeatherDefault,
   getWeatherByZip
}