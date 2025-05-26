const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const kegiatan = require("./routes/kegiatan");

app.use(express.json());

app.use("/kegiatan", kegiatan);

app.get("/laporan", (req, res) => {
  res.send("This is Example 1");
});
app.get("/laporan/:id", (req, res) => {
  res.send("This is Example 1.0 - Get ID Method: ${id}");
});
app.post("/laporan", (req, res) => {
  res.send("This is Example 1.1 - POST Method");
});
app.put("/laporan/:id", (req, res) => {
  res.send("This is Example 1.2 - PUT Method while use ${id}");
});
app.delete("/laporan", (req, res) => {
  res.send("This is Example 1.3 - DELETE Method");
});

app.get("/kegiatan", (req, res) => {
  res.send("This is Example 2");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
