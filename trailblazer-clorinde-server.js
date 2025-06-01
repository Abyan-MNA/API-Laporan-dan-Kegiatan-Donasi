// Load config
const dotenv = require("dotenv");
dotenv.config();
// Load CORS
const cors = require("cors");
// Load Express JS
express = require("express");
const app = express();
// Load Path
const path = require('path');
// Load other module
// Here
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require('./load/database');
const { authenticateToken, authorizeRole } = require('./middleware/authMiddleware');
const activity_info = require('./routes/kegiatanSosial_route');
const summary_donatedistreport = require('./routes/laporanKegiatanSosial_route');

// PORT for use
const port = process.env.PORT || 3000;

// Begin
app.use(cors());
app.use(express.json());

app.use("/data-kegiatan-sosial", authenticateToken, activity_info); // Social Activity Data
app.use("/data-laporan", summary_donatedistreport); // Summary/report

app.use("/", express.static(path.join(__dirname, 'trailblazer-version')));
app.use("/test-clorinde-mode", authenticateToken, authorizeRole(["admin"]), async (req, res) => {
  res.status(200).type('text/html').sendFile(path.join(__dirname, 'load/clorinde.html'));
});
app.use("/test-trailblazer-mode", authenticateToken, async (req, res) => {
  res.status(200).type('text/html').sendFile(path.join(__dirname, 'load/trailblazer.html'));
});

// Use error handler from middleware
app.use(errorHandler);

// Listen
async function startServer() {
  await connectDB();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`)
  });
};
startServer();
