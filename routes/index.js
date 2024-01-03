const express = require("express");
const router = express.Router();

// Define routes for the index, payment, contact, etc.
router.get("/", (req, res) => {
  // Logic for rendering the index page
  res.render("index");
});

router.get("/", (req, res) => {
  // Logic for rendering the payment page
  res.render("payment");
});

// Define other routes...

module.exports = router;
