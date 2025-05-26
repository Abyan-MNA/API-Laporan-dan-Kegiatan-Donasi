// const sqlite3 = require("sqlite3");
import sqlite3 from "sqlite3";

// db = sqlite3.verbose();
export const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Gagal connect ke database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});
