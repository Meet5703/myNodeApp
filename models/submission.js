const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  FatherName: { type: String, required: true },
  MotherName: { type: String, required: true },
  Address: { type: String, required: true },
  email: { type: String, required: true },
  ActingRole: { type: String, required: true }, // Corrected field definition
  MobileNumber: { type: String, required: true, minlength: 10, maxlength: 10 },
  WhatsAppNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  VideoUpload: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
