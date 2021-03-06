require('dotenv').config()
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

router.get('/', (req, res) => {
  // get a user by api key
  findUser(req.body.api_key)
    .then(user => {
      if (user.length){
        // retrieve an array of all user's favorite cities
        favoriteCities(user)
          .then(cities => {
            // return forecast for each city's location in the array
            forecastFor(cities)
              .then(forecasts => {
                res.status(200).send(forecasts)
                .catch(e)
              })
          })
        }else {
        res.status(401).json({
          error: 'Unauthorized'
        });
      }
    })
});

router.post('/', (req, res) => {
  let apiKey = req.body.api_key
  let cityState = req.body.location
  findUser(apiKey)
    .then(user => {
      if (user.length) {
        addFavorite(cityState, user)
         .then(favorite => {
           res.status(201).send(`"message": "${cityState} has been added to your favorites"`)
           .cache(e)
          })
        }else {
          res.status(401).json({
            error: 'Unauthorized'
        });
      }
    })
});

router.delete('/', (req, res) => {
  let apiKey = req.body.api_key
  let cityState = req.body.location
  findUser(apiKey)
    .then(user => {
      if (user.length) {
      let userId = user[0].id
      seekAndDestoryLocation(cityState, userId)
        .then(destroyed => {
          res.status(204).send()
// having trouble getting status: 204 to render on page here
          .catch(e)
          })
        }else {
          res.status(401).json({
            error: 'Unauthorized'
        });
      }
    })
});

async function findUser(apiKey) {
  try {
    return await database('users').where({apiKey: apiKey});
  } catch(e){
      return e;
  }
}

async function seekAndDestoryLocation(cityState, userId){
  try {
    return await database('favorites').where({location: cityState}).where({user_id: userId}).del()
  }catch(e){
    return e;
  }
}

async function favoriteCities(user) {
  let userId = user[0].id
  try{
    return await database('favorites').where({user_id: userId})
  }catch(e){
    return e;
  }
}

async function addFavorite(cityState, user){
  let userId = user[0].id
  try{
    return await database('favorites').insert({location: cityState, user_id: userId})
  }catch(e){
    return e;
  }
}

async function getCoordinates(cityState) {
  try {
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityState}&key=${process.env.GOOGLE_API_KEY}`);
    let data = await response.json();
    let coordinates = data.results[0].geometry.location;
    return coordinates;
  }catch(e) {
    return e;
  }
}

async function getForecast(coordinates) {
  try{
    let response = await fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${coordinates.lat},${coordinates.lng}?exclude=minutely,alerts,flags`);
    let data = await response.json();
    return data;
  }catch(e){
    return e;
  }
}

const forecastFor = (cities) => {
  const promises = cities.map(async (city) => {
    let coordinates = await getCoordinates(city.location)
    let forecast = await getForecast(coordinates)
      return {
          location: `${city.location}`,
          current_weather: forecast.currently
      }
  });
  return Promise.all(promises);
}

module.exports = router;
