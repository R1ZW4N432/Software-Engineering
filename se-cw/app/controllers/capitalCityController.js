// capitalCityController.js
const CapitalCityModel = require('../models/capitalCity'); // Make sure the path is correct

const capitalCityController = {
    list: (req, res) => {
        CapitalCityModel.findAll()
            .then(capitals => res.render('capital', { rows: capitals, activePage: 'capital-cities' }))
            .catch(err => {
                console.error('Error fetching capital cities:', err);
                res.status(500).send('Internal Server Error');
            });
    }
};

module.exports = capitalCityController;
