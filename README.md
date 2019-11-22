# Express Sweater Weather

## Welcome!

Express Sweater Weather is a Turing School of Software and Design solo project completed over 3 day sprint. It was designed as a first introduction to Express and Node.js.

### Build Using
- JavaScript
- Express
- Node.js
- Knex

## Checkout the Repo and the Live App hosted on Heroku!

GitHub Repo: (https://github.com/nathangthomas/express_sweater_weather)
Live App: (https://winter-weather-express.herokuapp.com/)

## Run Express Sweater Weather on your local machine!

1. `git clone https://github.com/nathangthomas/express_sweater_weather.git`
2. Run `npm install`
3. Add a `.env` file in your root directory. Don't forget to include this file in your .gitignore.
4. Add the following API keys to the `.env` file:
  - `GOOGLE_API_KEY=<your google api key here>`
  - `DARKSKY_API_KEY=<your darksky api key here>`
5. Run `psql` to get started setting up your database.
    `CREATE DATABASE <database_name>_dev;`
    `CREATE DATABASE <database_name>_test;`
    type \q to escape
6. Run `migrate:latest` and `knex seed:run` to migrate and seed your database
7. Spin up the server by running `npm start`
8. The following are the endpoints available:
  - `GET /api/v1/forecast?location=denver,co` (forecast for a city)
  - `POST /api/v1/favorites` (favoriting locations)
  - `GET /api/v1/favorites` (listing favorite locations)
  - `DELETE /api/v1/favorites` (removing favorite locations)

(all endpoints must be accompanied by an API Key assigned to your user in the database. This API key and all additional parameters must be passed in through the request body like the example below.)
```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
9. Choose to use either the [local server](http://localhost:3000) or [live Heroku app](https://winter-weather-express.herokuapp.com/) in combination with [Postman](https://www.getpostman.com/).

## Schema
<img width="504" alt="Screen Shot 2019-11-22 at 4 57 57 AM" src="https://user-images.githubusercontent.com/47466067/69424038-d42cbd00-0ce4-11ea-9aa3-ad1d3f4427ea.png">
