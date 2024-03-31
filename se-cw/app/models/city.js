const db = require('../services/db');

const City = {
    findAll: ({ district, n }) => {
        let whereClauses = [];
        let sql = 'SELECT ID, CountryCode, Name, District, Population FROM city';

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
    }
};

module.exports = City;
