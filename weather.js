'use strict'

const axios = require('axios');
const cache = require('./cache.js');

function getWeather(location) {
  const key = 'forecast-' + location;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&city=${location}`;

  if(!cache[key]) {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(data => parseWeatherData(data.data))
  }
  return cache[key].data;
}

function parseWeatherData(data) {
  try {
    const forecastArr = data.data.map(weather => {
      return new Forecast(weather);
    })
return Promise.resolve(forecastArr);
  } catch (err) {
    return Promise.reject(err);
  }
}

class Forecast {
  constructor(weather) {
    this.date = weather.datetime;
    this.lowtemp = weather.low_temp;
    this.hightemp = weather.high_temp;
    this.description = weather.description;
  }
}
// async function getWeather(req, res) {
//   const lat = req.query.lat;
//   const lon = req.query.lon;
//   const searchQuery = req.query.searchQuery;
//   const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&city=${searchQuery}`;
  
//   try {
//     let weather = await axios.get(url);
//     let forecastArray = [];
//     weather.data.data.map( (value, idx) => {
//       forecastArray.push(new Forecast(value.datetime, `Today's temp is ${value.temp}, with ${value.weather.description}`))
//     })
  
//     res.status(200).send(forecastArray)
//   } catch(err) {
//     console.log('error info:', err);
//   }
// }


module.exports = getWeather;