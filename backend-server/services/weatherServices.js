
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

function getWeather3DayForecast(zipcode, callback){
   let curr3DayForecast;
   weatherAPI.getWeather3DayForecast(zipcode, (weatherObj)=>{
      const formattedDate1 = formatDate(weatherObj.list[0].dt);
      const formattedDate2 = formatDate(weatherObj.list[1].dt);
      const formattedDate3 = formatDate(weatherObj.list[2].dt);
      const test = weatherObj.list[0].weather[0].main;
      curr3DayForecast = {
         Forecast1main:weatherObj.list[0].weather[0].main,
         Forecast1icon:weatherObj.list[0].weather[0].icon,
         Forecast1rain:(weatherObj.list[0].rain/25.4).toFixed(2),
         Forecast1desc:weatherObj.list[0].weather[0].description,
         Forecast1Date:formattedDate1,
         Forecast2main:weatherObj.list[1].weather[0].main,
         Forecast2icon:weatherObj.list[1].weather[0].icon,
         Forecast2rain:(weatherObj.list[1].rain/25.4).toFixed(2),
         Forecast2desc:weatherObj.list[1].weather[0].description,
         Forecast2Date:formattedDate2,
         Forecast3main:weatherObj.list[2].weather[0].main,
         Forecast3icon:weatherObj.list[2].weather[0].icon,
         Forecast3rain:(weatherObj.list[2].rain/25.4).toFixed(2),
         Forecast3desc:weatherObj.list[2].weather[0].description,
         Forecast3Date:formattedDate3
      }
      callback(curr3DayForecast);
   })
}

/**
 * Takes the zipcode of a location and returns the 24-hour rainfall amount
 * @param {*} zipcode The zipcode of the location where historical rain data is needed
 * @param {*} callback Rainfall in inches
 */
function getDailyRainfall(zipcode, callback){
   const MM_TO_INCHES = 25.4; // divide rainfallAmountMilli by this to get inches
   var rainfallAmountMilli = 0;
   
   weatherAPI.getDailyHistory(zipcode, (data)=>{
      const weatherData = Array.from(data.list);
      weatherData.forEach(hour =>{
         if(hour.rain){
            console.log("Rainfall:", hour.rain['1h']);
            //console.log("start iter:", rainfallAmountMilli);
            rainfallAmountMilli += hour.rain['1h'];
            //console.log("end iter", rainfallAmountMilli);
         }
      })
      console.log("total: ", rainfallAmountMilli);  
      callback(rainfallAmountMilli / MM_TO_INCHES);
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
   getWeather3DayForecast,
   getDailyRainfall
}