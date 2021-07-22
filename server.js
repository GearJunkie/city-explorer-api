'use strict';

//-----My Dependencies-----//
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

//-----My Config Server Stuff-----//
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//-----Application Constants-----//
const PORT = process.env.PORT || 3001
//-----My Routes-----//

//-----Capture a request coming into localhost:3333/weather-----//
app.get('/weather', getWeather);
// app.get('/movies', getMovies);
app.get('*', notWorking);

async function getWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&city=${searchQuery}`;

  // Back-End Browser Test: https://api.weatherbit.io/v2.0/current?key=197357214ac749298743e5f7e251dc1b&city=seattle
  
  try {
    let weather = await axios.get(url);
    let forecastArray = [];
    weather.data.data.map( (value, idx) => {
      forecastArray.push(new Forecast(value.datetime, `Today's temp is ${value.temp}, with ${value.weather.description}`))
    })
    //-----Send a response back to the client with the forecast for the city they chose-----//
    res.status(200).send(forecastArray)
  } catch(err) {
    console.log('error info:', err);
  }
}

// async function getMovies(req, res) {
//   let searchQuery = req.query.searchQuery;
//   let url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&city=${searchQuery}`;

//   try {
//     let movies = await axios.get(url);
//     let moviesArr = [];
//     movies.data.map((value.idx) => {
//       moviesArr.push(new movies(value))
//     })
//   }
// }

  //-----Route handler-----//
  function notWorking(req, res) {
    res.status(500).send('Unexpected error, please check your entry and try again');
  }

  class Forecast {
    constructor(datetime, temp, description) {
      this.datetime = datetime;
      this.temp = temp;
      this.description = description;
    }
  }

app.listen(PORT, () => {
  console.log(`Proof of life on port ${PORT}`);
});
