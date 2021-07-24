'use strict';

//-----My Dependencies-----//
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const getWeather = require('./weather.js');
const getMovies = require('./movies.js');

//-----My Config Server Stuff-----//
const app = express();
app.use(cors());
// dotenv.config();

//-----Application Constants-----//
const PORT = process.env.PORT || 3001

//-----My Routes-----//
app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);
app.use('*', errorHandler);

//-----Route handlers-----//

function weatherHandler (req, res) {
  const location = req.query.city;
  
  getWeather(location)
  .then(forecastArr => res.send(forecastArr))
}

function movieHandler (req, res) {
  const location = req.query.city;
  
  getMovies(location)
    .then(moviesArr => res.send(moviesArr))
}

function errorHandler(req, res) {
  res.status(404).send('Not Found: Please check your entry and try again');
  }

app.listen(PORT, () => {
  console.log(`Up and running on ${PORT}`);
});
