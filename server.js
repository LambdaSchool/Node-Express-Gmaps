const { server } = require("./App.js");
const { port } = require("./App.js");

server.listen(port);
console.log(`Server is listening at port ${port}`);