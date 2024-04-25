const db = require('../services/db');

const CapitalCity = {
    findAll: ({ continent, region, country, n }) => {
        let whereClauses = [];
        let sql = 'SELECT ID, CountryCode, Continent, Region, Country, Name, Population FROM capital';
        
        if (continent && continent !== "All Continents") {
            whereClauses.push(`Continent = '${continent}'`);
        }
        if (region && region !== "All Regions") {
            whereClauses.push(`Region = '${region}'`);
        }
        if (country) {
        whereClauses.push(`Country = '${country}'`);
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
    
    findByCountryCode: (countryCode) => {
        const sql = 'SELECT * FROM capital WHERE CountryCode = ?';
        return db.query(sql, [countryCode]);
      }
};

module.exports = CapitalCity;
