const db = require('../services/db');

const Population = {
    getWorldPopulation: () => {
        const sql = 'SELECT SUM(TotalPopulation) as WorldPopulation FROM population';
        return db.query(sql);
    },

    getPopulationByContinent: () => {
        const sql = `
            SELECT 
                Continent, 
                SUM(TotalPopulation) as TotalPopulation,
                SUM(CapitalPopulation) as CapitalPopulation,
                SUM(CityPopulation) as CityPopulation,
                SUM(NonCityPopulation) as NonCityPopulation,
                AVG(CapitalPopulationPercentage) as CapitalPopulationPercentage,
                AVG(CityPopulationPercentage) as CityPopulationPercentage,
                AVG(NonCityPopulationPercentage) as NonCityPopulationPercentage
            FROM population 
            GROUP BY Continent
        `;
        
        return db.query(sql);
    },

    getPopulationByRegion: () => {
        const sql = `
            SELECT 
                Region, 
                SUM(TotalPopulation) as TotalPopulation,
                SUM(CapitalPopulation) as CapitalPopulation,
                SUM(CityPopulation) as CityPopulation,
                SUM(NonCityPopulation) as NonCityPopulation,
                AVG(CapitalPopulationPercentage) as CapitalPopulationPercentage,
                AVG(CityPopulationPercentage) as CityPopulationPercentage,
                AVG(NonCityPopulationPercentage) as NonCityPopulationPercentage
            FROM population 
            GROUP BY Region
        `;
        return db.query(sql);
    },

    getPopulationByCountry: () => {
        const sql = `
            SELECT 
                CountryName,
                SUM(TotalPopulation) as TotalPopulation,
                SUM(CapitalPopulation) as CapitalPopulation,
                SUM(CityPopulation) as CityPopulation,
                SUM(NonCityPopulation) as NonCityPopulation,
                AVG(CapitalPopulationPercentage) as CapitalPopulationPercentage,
                AVG(CityPopulationPercentage) as CityPopulationPercentage,
                AVG(NonCityPopulationPercentage) as NonCityPopulationPercentage
            FROM population 
            GROUP BY CountryName
        `;
        return db.query(sql);
    },
};

module.exports = Population;
