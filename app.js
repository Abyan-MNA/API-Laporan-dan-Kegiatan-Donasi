const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const authenticateToken = require("./services/token");
// const kegiatan = require("./routes/kegiatan");
// const laporan = require("./routes/laporan");

app.use(express.json());

// app.use("/kegiatan", kegiatan);
// app.use("/laporan", laporan);
app.get("/", (req, res) => {
  res.send("Welcome to the Kegiatan API");
});

// playground login
app.post("/login", (req, res) => {
  const user = {
    username: "username",
    email: "email@gmail.com",
  };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});
app.listen(port, () => {
  console.log(`App listenning at http://localhost:${port}`);
});
