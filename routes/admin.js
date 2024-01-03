const express = require("express");
const router = express.Router();
const Submission = require("../models/submission");

// Define routes related to admin tasks
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.render("admin", { submissions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Define other admin-related routes...

module.exports = router;
