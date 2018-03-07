const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { gmaps } = require('./config.js');

const PORT = 3030;
const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const server = express();
server.use(bodyParser.json());
// server.use(cors());

const sendUserError = (msg, res) => {
  res.status(STATUS_USER_ERROR).json({ error: msg });
  return;
};

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});