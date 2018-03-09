const { server } = require("./index.js");
const { port } = require("./index.js");

server.listen(3000);
console.log(`The server is listening on port 3000`);