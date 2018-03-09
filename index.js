const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const server = express();
const port = 3000;



module.exports = { server, port };