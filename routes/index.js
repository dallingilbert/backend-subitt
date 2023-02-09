const routes = require("express").Router();

// Get route
routes.use("/users", require("./users"));

module.exports = routes;
