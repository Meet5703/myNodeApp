const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Middleware and settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads")); // Set your destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Routes
const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");
const submissionRoutes = require("./routes/submission");

app.use("/", indexRoutes);
app.use("/admin", adminRoutes);

// Use multer upload middleware for the submission route
app.use("/submit", upload.single("VideoUpload"), submissionRoutes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
