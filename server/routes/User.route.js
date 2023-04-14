const express = require("express");
const UserRoute = express.Router();
//Importing controllers
const { user, register, login } = require("../controllers/User.controller");
//Importing middlewares
const { userFields } = require("../middlewares/checkFields");

// Routing endpoints
UserRoute.get("/", user);
UserRoute.post("/register", userFields, register);
UserRoute.post("/login", userFields, login);

module.exports = { UserRoute };
