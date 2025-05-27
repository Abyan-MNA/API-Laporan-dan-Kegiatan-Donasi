const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// const kegiatan = require("./routes/kegiatan");
// const laporan = require("./routes/laporan");

app.use(express.json());

// app.use("/kegiatan", kegiatan);
// app.use("/laporan", laporan);
app.get("/", (req, res) => {
  res.send("Welcome to the Kegiatan API");
});
app.listen(port, () => {
  console.log(`App listenning at http://localhost:${port}`);
});
