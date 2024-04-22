// cityController.js
const CityModel = require('../models/city'); // Make sure the path is correct

const cityController = {
    list: (req, res) => {
        const { district, n } = req.query;
        CityModel.findAll({ district, n })
            .then(cities => res.render('cities', { rows: cities, activePage: 'cities' }))
            .catch(err => {
                console.error('Error fetching cities:', err);
                res.status(500).send('Internal Server Error');
            });
    }
};

module.exports = cityController;
