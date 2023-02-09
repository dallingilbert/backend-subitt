const routes = require("express").Router();
const userController = require("../controllers/users");

// Get routes
routes.get("/", userController.getUsers);
routes.get("/:id", userController.getUserById);

// Post routes
//routes.post("/", )

module.exports = routes;
