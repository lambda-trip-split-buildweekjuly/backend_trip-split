const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express') ;
const swaggerDocument = require('../swagger.json');
const configureRoutes = require("./TripSlipt/tripsplit-route.js");
require('dotenv').config()

const server = express();

server.use(helmet());
server.use(cors(), logger);
server.use(express.json());
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

configureRoutes(server);
function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}
server.all("*", (req, res) => {
  res.status(404).json("Sorry No Such Location");
});

module.exports = server;
