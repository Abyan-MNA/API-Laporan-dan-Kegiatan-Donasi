const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const kegiatan = require("./routes/kegiatan");

app.use(express.json());

app.use("/kegiatan", kegiatan);
app.use("/laporan", laporan);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
