require('dotenv').config()
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch')

//example ...  /api/v1/forecast?location=denver,co
router.get( '/', (req, res) => {
  getCoordinates(req.query.location)
    .then(coordinates => {
      getForecast(coordinates)
        .then(forecast => {
          res.status(200).send(forecast)
        })
    })
});

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
