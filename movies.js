'use strict';

const axios = require('axios');

async function getMovies(req, res) {
  const searchQuery = req.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&query=${searchQuery}`;

  try {
    let movies = await axios.get(url);
    let moviesArray = [];
    movies.data.results.map( (value,idx) => { //<--- order of .data vs .results?
      moviesArray.push(new Movies(value.title, value.popularity, value.image_url, value.description))
    })
 
    res.status(200).send(moviesArray);
  } catch(err) {
    console.error(err);
    }
}

class Movies {
  constructor(title, description, popularity, image_url) {
    this.title = title;
    this.popularity = popularity;
    this.image_url = image_url;
    this.description = description;
  }
}


module.exports = getMovies;
