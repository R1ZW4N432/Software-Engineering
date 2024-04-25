const Population = require('../models/population'); // Ensure this matches the name of your population model file

const populationController = {
    list: (req, res) => {
        Promise.all([
            Population.getWorldPopulation(),
            Population.getPopulationByContinent(),
            Population.getPopulationByRegion(),
            Population.getPopulationByCountry(),
        ])
        .then(([worldPopulation, continents, regions, countries]) => {
            res.render('population', {
                worldPopulation: worldPopulation[0].WorldPopulation,
                continents,
                regions,
                countries,
                activePage: 'population',
            });
        })
        .catch(err => {
            console.error('Error fetching population data:', err);
            res.status(500).send('Internal Server Error');
        });
    }
};

module.exports = populationController;
