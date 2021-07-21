'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weatherData = require('./data/weather.json');

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001

// app.listen(3000, () => console.log('server up'));

// app.get('/test', (req, res) => {
//   res.send('test worked');
// })

// app.listen(PORT, () => {
//   console.log('server works on 3333');
// });

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  const city = new Forecast(weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase()));
  

  class Forecast {
    constructor(datetime, description) {
      this.date = date;
      this.description = description;
      forecastArr = [];
      // newArr = arr.map( ())
    }
  }

  res(200).send(this.forecastArr);
});

app.listen(PORT, () => {
  console.log(`Proof of life on port ${PORT}`);
});
