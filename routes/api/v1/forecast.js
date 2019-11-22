require('dotenv').config()
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

//example ...  /api/v1/forecast?location=denver,co
router.get( '/', (req, res) => {
  findUser(req.body.api_key)
    .then(user => {
      if (user.length){
        getCoordinates(req.query.location)
        .then(coordinates => {
        getForecast(coordinates)
          .then(forecast => {
          res.status(200).send(forecast)
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

async function findUser(apiKey) {
  try {
    return await database('users').where({apiKey: apiKey});
  } catch(e){
      return e;
  }
}

async function getForecast(coordinates) {
  try{
    let response = await fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${coordinates.lat},${coordinates.lng}?exclude=minutely,alerts,flags`);
    let data = await response.json();
    return data;
  }catch (e){
    return e;
  }
}

async function getCoordinates(cityState) {
  try {
    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityState}&key=${process.env.GOOGLE_API_KEY}`);
    let data = await response.json();
    let coordinates = data.results[0].geometry.location;
    return coordinates;
  }catch (e) {
    return e;
  }
}

module.exports = router;
