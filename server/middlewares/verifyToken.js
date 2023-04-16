const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const { token } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ res: "Authorization Error" });
  }
  const token = authHeader.split(" ")[1];
  //Verifying token
  jwt.verify(token, "webtoken", async function (err, decoded) {
    if (err) {
      // handle JWT verification error
      return res
        .status(400)
        .send({ res: "Unauthorized User", error: "Invalid token" });
    }
    //Passing email from decoded token
    req.body.user = decoded;
    next();
  });
};
module.exports = { verifyToken };
