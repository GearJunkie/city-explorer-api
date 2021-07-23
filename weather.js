'use strict'

const axios = require('axios');

async function getWeather(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&city=${searchQuery}`;
  
  try {
    let weather = await axios.get(url);
    let forecastArray = [];
    weather.data.data.map( (value, idx) => {
      forecastArray.push(new Forecast(value.datetime, `Today's temp is ${value.temp}, with ${value.weather.description}`))
    })
  
    res.status(200).send(forecastArray)
  } catch(err) {
    console.log('error info:', err);
  }
}

class Forecast {
  constructor(datetime, temp, description) {
    this.datetime = datetime;
    this.temp = temp;
    this.description = description;
  }
}

module.exports = getWeather;