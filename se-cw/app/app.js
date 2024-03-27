// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

//use the PUG templating engine
app.set('view engine', 'pug');
app.set('views', './app/views')

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root - /
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/countries", function(req, res) {
    let { continent, region, n } = req.query;
    let whereClauses = [];
    let sql = 'SELECT Code, Name, Continent, Region, Capital, Population FROM country';

    if (continent && continent !== "All Continents") {
        whereClauses.push(`Continent = '${continent}'`);
    }
    // Check if a specific region is selected or if "All Regions" is the choice
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

    db.query(sql).then(results => {
        res.render('countries', { rows: results, activePage: 'countries' });
    }).catch(error => {
        console.error('Error fetching countries:', error);
        res.status(500).send('Internal Server Error');
    });
});


app.get("/cities", function(req, res) {
    let { district, n } = req.query;
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

    db.query(sql).then(results => {
        // Assuming you have a view engine like Pug set up
        res.render('cities', { rows: results, activePage: 'cities' });
    }).catch(error => {
        console.error('Error fetching cities:', error);
        res.status(500).send('Internal Server Error');
    });
});

app.get("/capital-cities", function(req, res) {
    // Adjusted SQL query to fetch additional country name information for display
    var sql = 'SELECT ID, CountryCode, Name, CountryName, Population FROM capital';
    db.query(sql).then(results => {
        res.render('capital', { rows: results, activePage: 'capital-cities' });
    }).catch(error => {
        console.error('Error fetching capital cities:', error);
        res.status(500).send('Internal Server Error');
    });
});

app.get("/language", function(req, res) {
    // Query to select relevant fields. Note: You might want to adjust the fields based on your database schema.
    var sql = 'SELECT CountryCode AS Code, Language, IsOfficial, Percentage FROM countrylanguage';

    db.query(sql).then(results => {
        // Modify the IsOfficial field directly in the results for simplicity
        results.forEach(row => {
            row.IsOfficial = row.IsOfficial === 'T' ? 'Yes' : 'No';
            // Formatting of Percentage will be handled in the Pug template
        });

        // Render the 'language' Pug template instead of generating HTML
        // Pass the rows and activePage to the template
        res.render('language', { rows: results, activePage: 'language' });
    }).catch(error => {
        console.error('Error fetching languages:', error);
        res.status(500).send('Internal Server Error');
    });
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});
