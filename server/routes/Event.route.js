const express = require("express");
const EventRoute = express.Router();
//Importing controllers
const { event } = require("../controllers/Event.controller");

EventRoute.get("/", event);

module.exports = { EventRoute };
