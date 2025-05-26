const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is Example 2");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`This is Example 2.0 - Get ID Method: ${id}`);
});
module.exports = router;
