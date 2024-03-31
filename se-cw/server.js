// server.js
"use strict";

const app = require('./app/app'); // Adjust the path if necessary

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});