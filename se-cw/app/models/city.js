const db = require('../services/db');

const City = {
    findAll: ({ continent, region, district, n }) => {
        let whereClauses = [];
        let sql = 'SELECT ID, CountryCode, Continent, Region, Country, Name, District, Population FROM city';
        
        if (continent && continent !== "All Continents") {
            whereClauses.push(`Continent = '${continent}'`);
        }
        if (region && region !== "All Regions") {
            whereClauses.push(`Region = '${region}'`);
        }
        if (district) {
            whereClauses.push(`District = '${district}'`);
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
        const sql = 'SELECT * FROM city WHERE CountryCode = ?';
        return db.query(sql, [countryCode]);
      }
};

module.exports = City;
