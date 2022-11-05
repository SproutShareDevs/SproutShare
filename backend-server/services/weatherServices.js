
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
function getWeather3DayForcast(zipcode, callback){
   let curr3DayForcast;
   weatherAPI.getWeather3DayForcast(zipcode, (weatherObj)=>{
      const formattedDate1 = formatDate(weatherObj.list[0].dt);
      const formattedDate2 = formatDate(weatherObj.list[1].dt);
      const formattedDate3 = formatDate(weatherObj.list[2].dt);
      const test = weatherObj.list[0].weather[0].main;
      curr3DayForcast = {
         forcast1main:weatherObj.list[0].weather[0].main,
         forcast1icon:weatherObj.list[0].weather[0].icon,
         forcast1Date:formattedDate1,
         forcast2main:weatherObj.list[1].weather[0].main,
         forcast2icon:weatherObj.list[1].weather[0].icon,
         forcast2Date:formattedDate2,
         forcast3main:weatherObj.list[2].weather[0].main,
         forcast3icon:weatherObj.list[2].weather[0].icon,
         forcast3Date:formattedDate3
      }
      callback(curr3DayForcast);
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
   getWeatherByZip,
   getWeather3DayForcast
}