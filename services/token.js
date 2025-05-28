const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Membutuhkan JWT access token");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new Error("Verifikasi token gagal");
    }
    req.user = user; // Attach user info to request
  });
  next();
};

module.exports = authenticateToken;
