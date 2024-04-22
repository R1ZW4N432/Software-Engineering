const db = require('../services/db');

const Language = {
    findAll: () => {
        const sql = 'SELECT CountryCode AS Code, Language, IsOfficial, Percentage FROM countrylanguage';
        return db.query(sql).then(results => {
            // Modify the IsOfficial field directly in the results for simplicity
            return results.map(row => {
                return {
                    ...row,
                    IsOfficial: row.IsOfficial === 'T' ? 'Yes' : 'No'
                };
            });
        });
    }
};

module.exports = Language;
