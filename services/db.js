const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Gagal connect ke database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});
