const express = require("express");
const UserRoute = express.Router();
//Importing controllers
const { user } = require("../controllers/User.controller");

UserRoute.get("/", user);

module.exports = { UserRoute };
