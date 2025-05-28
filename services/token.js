const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.sendStatus(404);
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
};

module.exports = authenticateToken;
