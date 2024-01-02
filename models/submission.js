const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  FatherName: { type: String, required: true },
  MotherName: { type: String, required: true },
  Address: { type: String, required: true },
  email: { type: String, required: true },
  ActingRole: { type: String, required: true },
  MobileNumber: { type: String, required: true },
  WhatsAppNumber: {
    type: String,
    required: true,
  },
  VideoUpload: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
