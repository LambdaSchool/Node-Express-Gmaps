const express = require('express');
const  config  = require('./config.js');
const PORT = config.port;

















server.listen(PORT, err => {
    if (err) {
        console.log(`Error starting server: ${err}`);
    } else {
        console.log(`App listening on port ${PORT}`)
    }
}) 