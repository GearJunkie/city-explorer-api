'use strict';

//-----My Dependencies-----//
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const getWeather = require('./weather.js');
const getMovies = require('./movies.js');

//-----My Config Server Stuff-----//
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//-----Application Constants-----//
const PORT = process.env.PORT || 3001

//-----My Routes-----//
app.get('/weather', getWeather);
app.get('/movies', getMovies);
app.get('*', notWorking);

//-----Route handler-----//
function notWorking(req, res) {
  res.status(500).send('Error 500: Unexpected error, please check your entry and try again');
  }

app.listen(PORT, () => {
  console.log(`Proof of life on port ${PORT}`);
});
