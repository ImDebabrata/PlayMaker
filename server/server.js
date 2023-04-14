const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { connection } = require("./config/db");

//Importing models
const { UserModel } = require("./models/User.model");
const { EventModel } = require("./models/Event.model");
//Importing Routing
const { UserRoute } = require("./routes/User.route");
const { EventRoute } = require("./routes/Event.route");

const app = express();

//Getting Port from dotenv file
const port = process.env.port || 8080;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ res: "Welcome to Playmaker API" });
});

//Using Routing
app.use("/user", UserRoute);
app.use("/event", EventRoute);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to Database successfully");
  } catch (error) {
    console.log("Something went wrong", error);
  }
  console.log(`Server is listening on port ${port}`);
});
