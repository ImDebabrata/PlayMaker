const express = require("express");
const EventRoute = express.Router();
//Importing controllers
const {
  event,
  createEvent,
  applyEvent,
  acceptPlayer,
  rejectPlayer,
  eventById,
  eventByUserId,
} = require("../controllers/Event.controller");
//Importing middlewares
const { eventFields } = require("../middlewares/checkFields");
const { verifyToken } = require("../middlewares/verifyToken");

EventRoute.get("/", event);
EventRoute.get("/:eventId", verifyToken, eventById);
EventRoute.get("/user/:userId", eventByUserId);
EventRoute.post("/", eventFields, verifyToken, createEvent);
EventRoute.post("/:eventId/apply", verifyToken, applyEvent);
EventRoute.post("/:eventId/accept/:userId", verifyToken, acceptPlayer);
EventRoute.post("/:eventId/reject/:userId", verifyToken, rejectPlayer);

module.exports = { EventRoute };
