// languageController.js
const LanguageModel = require('../models/language'); // Make sure the path is correct

const languageController = {
    list: (req, res) => {
        LanguageModel.findAll()
            .then(languages => res.render('language', { rows: languages, activePage: 'language' }))
            .catch(err => {
                console.error('Error fetching languages:', err);
                res.status(500).send('Internal Server Error');
            });
    }
};

module.exports = languageController;

