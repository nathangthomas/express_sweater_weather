require('dotenv').config()
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch')

router.get('/', (req, res) => {
  res.send(getCoordinates());
});

async function coordinates() {
  try {
    console.log(process.env.GOOGLE_API_KEY)
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=denver,co&key=${process.env.GOOGLE_API_KEY}`;

    let response = await fetch(url);
    let json = await response.json();
    console.log(JSON.stringify(json.results[0].geometry.location));


    return json.results[0].geometry.location;
  } catch (e) {
    return e;
  }
}

module.exports = router;
