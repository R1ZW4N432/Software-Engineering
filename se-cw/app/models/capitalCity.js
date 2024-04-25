const db = require('../services/db');

const CapitalCity = {
    findAll: () => {
        const sql = 'SELECT ID, CountryCode, Name, CountryName, Population FROM capital';
        return db.query(sql);
    }
};

module.exports = CapitalCity;
