const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = express();
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))
 
  // parse application/json
  app.use(bodyParser.json())

  consign()
    .include('controllers') // pasta controllers
    .into(app);

  return app;
}