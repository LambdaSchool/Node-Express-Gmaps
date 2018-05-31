const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch')

var port = 5001


const server = express();
server.use(express.json());
server.use(cors());

const sendUserError = (status, message, res) => {
  res.status(status).json(message);
}



server.get('/', (req, res) => {
  const searchPlace = req.query.q;
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchPlace}&key=`;


  const getLocation = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const lat = json.results[0].geometry.location.lat;
      const long = json.results[0].geometry.location.lng;
      const url2 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=restaurant&keyword=restaurant&key=`
      const response2 = await fetch(url2);
      const json2 = await response2.json();
      //console.log('json2',json2.results[0].name)
      const name = json2.results[0].name;
      res.json({name})
    } catch (error) {
      console.log(error);
    }
  };

  getLocation(url)


})


server.listen(port, () => console.log(`server running on port ${port}`))
