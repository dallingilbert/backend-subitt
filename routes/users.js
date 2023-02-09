const routes = require("express").Router();
const Api404Error = require("../api404Error");
const userController = require("../controllers/users");

// GET Routes
routes.get("/", userController.getUsers);
routes.get("/:id", userController.getUserId);

// POST routes
routes.post("/", userController.addUser);

// PUT routes
routes.put("/:id", userController.updateUser);

// DELETE routes
routes.delete("/:id", userController.deleteUser);

module.exports = routes;
