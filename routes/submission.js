const express = require("express");
const router = express.Router();
const Submission = require("../models/submission");

// Define routes related to form submissions
router.post("/", async (req, res) => {
  try {
    // Retrieve form data from the request
    const {
      Name,
      FatherName,
      MotherName,
      Address,
      email,
      ActingRole,
      MobileNumber,
      WhatsAppNumber,
    } = req.body;

    // Ensure all required fields are present
    const requiredFields = [
      Name,
      FatherName,
      MotherName,
      Address,
      email,
      ActingRole,
      MobileNumber,
      WhatsAppNumber,
    ];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).send("Missing required fields");
    }

    // Example: Create a new Submission instance using the Submission model
    const newSubmission = new Submission({
      Name,
      FatherName,
      MotherName,
      Address,
      email,
      ActingRole,
      MobileNumber,
      WhatsAppNumber,
      // You may also save the uploaded file path here if handling file uploads
      // VideoUpload: req.file ? req.file.path : null,
    });

    // Save the new submission to the database
    const savedSubmission = await newSubmission.save();

    console.log("Submission saved:", savedSubmission);

    // Redirect to a success page after successful submission
    res.redirect("/success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Define other submission-related routes...

module.exports = router;
