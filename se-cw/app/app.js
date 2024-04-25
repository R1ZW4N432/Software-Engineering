const express = require('express');
const app = express();

// Import the models needed for data retrieval
const CountryModel = require('./models/country');
const CityModel = require('./models/city');
const CapitalCityModel = require('./models/capitalCity');

// Middleware setup for static files, view engine, and views directory
app.use(express.static("static"));
app.set('view engine', 'pug');
app.set('views', './app/views');

// Existing controllers for other routes
const countryController = require('./controllers/countryController');
const cityController = require('./controllers/cityController');
const capitalCityController = require('./controllers/capitalCityController');
const languageController = require('./controllers/languageController');

// Add the new population controller
const populationController = require('./controllers/populationController');

// Existing routes
app.get("/", (req, res) => res.render("index"));
app.get("/countries", countryController.list);
app.get("/cities", cityController.list);
app.get("/capital-cities", capitalCityController.list);
app.get("/language", languageController.list);

// New route for population data
app.get("/population", populationController.list);

// Route to fetch and display information for a specific country
app.get("/country/:code", (req, res) => {
    const { code } = req.params;

    Promise.all([
        CountryModel.findByCode(code), // Fetch country information
        CountryModel.findCountryDetails(code), // Fetch country details
        CityModel.findByCountryCode(code), // Fetch all cities in the country
        CapitalCityModel.findByCountryCode(code) // Fetch the capital city
    ])
    .then(([country, countrydetails, cities, capital]) => {
        res.render('country-details', {
            country: country[0],
            countrydetails: countrydetails[0],
            cities,
            capital,
            activePage: 'country-details'
        });
    })
    .catch(err => {
        console.error('Error fetching country data:', err);
        res.status(500).send('Internal Server Error');
    });
});

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route does not exist.");
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Export the Express app module
module.exports = app;
