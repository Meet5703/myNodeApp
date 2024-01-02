const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Submission = require("./models/submission");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submitPayment", upload.single("VideoUpload"), async (req, res) => {
  try {
    const {
      Name,
      FatherName,
      MotherName,
      Address,
      email,
      ActingRole,
      MobileNumber,
      WhatsAppNumber,
      // ... other necessary fields
    } = req.body;

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

    const newSubmission = new Submission({
      Name,
      FatherName,
      MotherName,
      Address,
      email,
      ActingRole,
      MobileNumber,
      WhatsAppNumber,
      VideoUpload: req.file ? req.file.path : null,
      // ... other necessary fields
    });

    const savedSubmission = await newSubmission.save();

    console.log("Submission saved:", savedSubmission);
    res.render("/payment");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/payment", (req, res) => {
  res.render("payment");
});

app.get("/admin", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.render("admin", { submissions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/admin/download/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission || !submission.VideoUpload) {
      return res.status(404).send("Video not found");
    }

    const videoPath = path.join(__dirname, "public", submission.VideoUpload);

    res.set({
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${path.basename(
        submission.VideoUpload
      )}"`,
    });

    res.sendFile(videoPath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
