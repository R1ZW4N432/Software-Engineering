const db = require('../services/db');

const Country = {
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
    }
};

module.exports = Country;
