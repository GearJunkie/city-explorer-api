'use strict';

const axios = require('axios');
const cache = require('./cache.js');

function getMovies(location) {
  const key = 'movies-' + location;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&query=${location}`;

  if(!cache[key]) {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(data => parseMovieData(data.data))
  }
  return cache[key].data;
}

function parseMovieData(data) {
  try {
    const moviesArr = data.results.map(movie => {
      return new Movie(movie);
    })
return Promise.resolve(moviesArr);
  } catch (err) {
    return Promise.reject(err);
  }
}

class Movie {
  constructor(movie) {
    this.tableName = 'movies',
    this.title = movie.title,
    this.overview = movie.overview,
    this.avgVotes = movie.vote_average,
    this.totalVotes = movie.vote_count,
    this.image_url = movie.poster_path, //<--- Do I need something else in this object?
    this.popularity = movie.popularity,
    this.releasedOn = movie.release_date,
    this.timestamp = Date.now()
  }
}

// function getMovies(req, res) {
//   const searchQuery = req.query.searchQuery;
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&query=${searchQuery}`;

//   try {
//     let movies = await axios.get(url);
//     let movieArray = [];
//     movies.data.results.map( (value,idx) => { //<--- order of .data vs .results?
//       movieArray.push(new Movie(value.title, value.popularity, value.image_url, value.description))
//     })
 
//     res.status(200).send(moviesArray);
//   } catch(err) {
//     console.error(err);
//     }
// }

module.exports = getMovies;
