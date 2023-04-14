//Checking for username and password fields
const userFields = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ res: "Username and Password are required" });
  }
  next();
};

module.exports = { userFields };
