const express = require('express');
const server = express();


const  config  = require('./config.js');
const PORT = config.port;



// It should be added. 













server.listen(PORT, err => {
    if (err) {
        console.log(`Error starting server: ${err}`);
    } else {
        console.log(`App listening on port ${PORT}`)
    }
}) 