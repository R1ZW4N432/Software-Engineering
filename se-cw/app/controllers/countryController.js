// countryController.js
const CountryModel = require('../models/country'); // Ensure this matches the name of your country model file

const countryController = {
    list: (req, res) => {
        const { continent, region, n } = req.query;
        CountryModel.findAll({ continent, region, n })
            .then(countries => res.render('countries', { rows: countries, activePage: 'countries' }))
            .catch(err => {
                console.error('Error fetching countries:', err);
                res.status(500).send('Internal Server Error');
            });
    }
};

module.exports = countryController;
