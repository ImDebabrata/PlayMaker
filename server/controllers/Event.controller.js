const { default: mongoose } = require("mongoose");
const { EventModel } = require("../models/Event.model");

//Get all posts
const event = async (req, res) => {
  try {
    const events = await EventModel.find().populate("organizer", "username");
    res.send({ res: "All Events", events });
  } catch (error) {
    res.send({ res: "Something went wrong", error });
  }
};

const eventById = async (req, res) => {
  // const { user } = req.body;
  const { eventId } = req.params;
  try {
    const getEvent = await EventModel.findById(eventId)
      .populate("organizer", "username")
      .populate("players", "username")
      .populate("waitingList", "username");
    if (!getEvent) {
      return res.status(404).send({ res: "Event not found!" });
    }
    return res.send({ res: "Get event Successfully", event: getEvent });
  } catch (error) {
    res.send({ res: "Something went wrong", error });
  }
};

//Create new event
const createEvent = async (req, res) => {
  const { name, description, timings, playerLimit, user } = req.body;
  const newevent = new EventModel({
    name,
    description,
    timings,
    playerLimit,
    organizer: user.userID,
  });
  newevent.save();
  res.send({ res: "Created new event", event: newevent });
};

//Player apply for event
const applyEvent = async (req, res) => {
  const { user } = req.body;
  const { eventId } = req.params;
  try {
    //Getting event by id;
    const getEvent = await EventModel.findById(eventId);
    if (!getEvent) {
      return res.status(404).send({ res: "Event not found" });
    }
    //Check is event full
    if (getEvent.players.length >= getEvent.playerLimit) {
      return res.status(400).send({ res: "Event is full" });
    }
    //Check player already in waiting list;
    if (getEvent.waitingList.includes(user.userID)) {
      return res.status(400).send({ res: "You are already in waiting list" });
    }
    //Check player already in player list;
    if (getEvent.players.includes(user.userID)) {
      return res.status(400).send({ res: "You are already in player list" });
    }
    //Adding player to waiting list;
    getEvent.waitingList.push(user.userID);
    await getEvent.save();
    return res.send({ res: "You have been added to waiting list" });
  } catch (error) {
    return res.send({ res: "Something went wrong", error });
  }
};

//Organizer accept player request
const acceptPlayer = async (req, res) => {
  const { user: organizer } = req.body;
  const { eventId, userId } = req.params;

  try {
    //Getting event by id
    const getEvent = await EventModel.findById(eventId);
    if (!getEvent) {
      return res.status(404).send({ res: "Event not found" });
    }
    //Check organizer is the one making the request;
    if (
      getEvent.organizer.toString() !=
      new mongoose.Types.ObjectId(organizer.userID)
    ) {
      return res
        .status(400)
        .send({ res: "You are not authorized to accept player" });
    }
    //Check if player is on waiting list
    const waitingListIndex = getEvent.waitingList.indexOf(userId);
    if (waitingListIndex === -1) {
      return res.status(404).send({ res: "User is not on the waiting list" });
    }
    //Move user waiting list to playerlist
    getEvent.waitingList.splice(waitingListIndex, 1);
    getEvent.players.push(userId);
    await getEvent.save();
    return res.send({ res: "Player has been moved to the players list" });
  } catch (error) {
    console.log("error:", error);
    return res.send({ res: "Something went wrong", error });
  }
};

const rejectPlayer = async (req, res) => {
  const { user: organizer } = req.body;
  const { eventId, userId } = req.params;

  try {
    // Getting event by id
    const getEvent = await EventModel.findById(eventId);
    if (!getEvent) {
      return res.status(404).send({ res: "Event not found" });
    }
    // Check if organizer is the one making the request
    if (
      getEvent.organizer.toString() !=
      new mongoose.Types.ObjectId(organizer.userID)
    ) {
      return res
        .status(400)
        .send({ res: "You are not authorized to reject player" });
    }
    // Check if player is on waiting list
    const waitingListIndex = getEvent.waitingList.indexOf(userId);
    if (waitingListIndex === -1) {
      return res.status(404).send({ res: "User is not on the waiting list" });
    }
    // Remove user from waiting list
    getEvent.waitingList.splice(waitingListIndex, 1);
    await getEvent.save();
    return res.send({ res: "Player has been rejected from the event" });
  } catch (error) {
    console.log("error:", error);
    return res.send({ res: "Something went wrong", error });
  }
};

const eventByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const events = await EventModel.find({
      $or: [{ waitingList: userId }, { players: userId }],
    })
      .populate("organizer", "username")
      .populate({
        path: "waitingList",
        select: "username",
        match: { _id: userId },
      })
      .populate({
        path: "players",
        select: "username",
        match: { _id: userId },
      })
      .exec();

    const acceptedEvents = events.filter((event) =>
      event.players.find((player) => player._id.toString() === userId)
    );
    const pendingEvents = events.filter((event) =>
      event.waitingList.find((player) => player._id.toString() === userId)
    );

    res.send({ res: "Get Events", acceptedEvents, pendingEvents });
  } catch (error) {
    console.error(error);
    res.status(500).send({ res: "Server error", error });
  }
};

module.exports = {
  event,
  eventById,
  createEvent,
  applyEvent,
  acceptPlayer,
  rejectPlayer,
  eventByUserId,
};
