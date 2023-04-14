const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = (req, res) => {
  res.send({ res: "User Route" });
};

//Register new user
const register = async (req, res) => {
  const { username, password } = req.body;
  //check is user already exist?
  const userPresent = await UserModel.findOne({ username });
  if (userPresent) {
    return res.status(400).send({ res: "User is already exists" });
  }
  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      const user = new UserModel({ username, password: hash });
      await user.save();
      res.status(201).send({ res: "Signup Success" });
    });
  } catch (error) {
    res.send({ res: "Something went wrong", error });
  }
};

//Login user
const login = async (req, res) => {
  const { username, password } = req.body;
  //check is user already exist?
  const isExist = await UserModel.findOne({ username });
  if (!isExist) {
    return res.status(400).send({ res: "User is not exists" });
  }
  try {
    const hashedPassword = isExist.password;
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { email: isExist.username, userID: isExist._id },
          "webtoken"
        );
        res.send({ res: `Hello ${isExist.username}`, token });
      } else {
        res.status(404).send({ res: "Password Incorrect" });
      }
    });
  } catch (error) {
    res.send({ res: "Something went wrong", error });
  }
};

module.exports = { user, register, login };
