//Checking for username and password fields
const userFields = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ res: "Username and Password are required" });
  }
  next();
};

//Checking for event fields;
const eventFields = (req, res, next) => {
  const { description, timings, playerLimit, name } = req.body;
  if (!description || !timings || !playerLimit || !name) {
    return res.status(400).send({ res: "Please input all the fields" });
  }
  next();
};

module.exports = { userFields, eventFields };
