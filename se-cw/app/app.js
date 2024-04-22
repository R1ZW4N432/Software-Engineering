const express = require('express');
const app = express();

// Set up static files, view engine, and views directory
app.use(express.static("static"));
app.set('view engine', 'pug');
app.set('views', './app/views');

// Require controllers
const countryController = require('./controllers/countryController');
const cityController = require('./controllers/cityController');
const capitalCityController = require('./controllers/capitalCityController');
const languageController = require('./controllers/languageController');

// Routes
app.get("/", (req, res) => res.render("index")); // Root path controller logic could also be separated out if needed
app.get("/countries", countryController.list);
app.get("/cities", cityController.list);
app.get("/capital-cities", capitalCityController.list);
app.get("/language", languageController.list);

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route does not exist.");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Export the app module
module.exports = app;
