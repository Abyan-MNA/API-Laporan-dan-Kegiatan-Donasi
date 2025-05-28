const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const prisma = require("./services/db");
const authenticateToken = require("./services/token");

dotenv.config();
const port = process.env.PORT || 3000;

const kegiatan = require("./routes/kegiatan");
// const laporan = require("./routes/laporan");

app.use(express.json());
app.use("/kegiatan", authenticateToken, kegiatan);
// app.use("/laporan", laporan);
app.post("/", authenticateToken, async (req, res) => {
  const kegiatan = await prisma.kegiatan.findMany();
  res.status(200).json({
    message: "Welcome to the API",
    data: kegiatan,
  });
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
