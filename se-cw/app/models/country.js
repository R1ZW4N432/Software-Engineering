const db = require('../services/db');

const Country = {
    // Method to find all countries with optional filtering
    findAll: ({ continent, region, n }) => {
        let whereClauses = [];
        let sql = 'SELECT Code, Name, Continent, Region, Capital, Population FROM country';

        if (continent && continent !== "All Continents") {
            whereClauses.push(`Continent = '${continent}'`);
        }
        if (region && region !== "All Regions") {
            whereClauses.push(`Region = '${region}'`);
        }
        if (whereClauses.length) {
            sql += ' WHERE ' + whereClauses.join(' AND ');
        }
        sql += ' ORDER BY Population DESC';
        if (n) {
            sql += ` LIMIT ${parseInt(n)}`;
        }

        return db.query(sql);
    },

    // Method to find a specific country by its code
    findByCode: (code) => {
        const sql = 'SELECT * FROM country WHERE Code = ?';
        return db.query(sql, [code]);
    },
    
    // New method to fetch data from the countrydetails table
    findCountryDetails: (code) => {
        const sql = 'SELECT * FROM countrydetails WHERE CountryCode = ?';
        return db.query(sql, [code]);
    }
};

module.exports = Country;
