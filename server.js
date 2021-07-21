'use strict';

//-----My Dependencies-----//
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weatherData = require('./data/weather.json');

//-----My Config Server Stuff-----//
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001

//-----My Routes-----//

//-----Capture a request coming into localhost:3333/weather-----//
app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  let city = (weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase()));
  
  class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }

  let forecastArr = [];
  city.data.map( (value, idx) => {
    forecastArr.push(new Forecast(value.datetime, `A low of ${value.low_temp}, and a high of ${value.high_temp}, with ${value.weather.description}`))
  })
//-----Send a response back to the client with the forecast for the city they chose-----//
  res.send(forecastArr);
});

app.listen(PORT, () => {
  console.log(`Proof of life on port ${PORT}`);
});
