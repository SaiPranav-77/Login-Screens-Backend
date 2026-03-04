const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection (use environment variable)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
})
.catch(err => {
  console.log("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected DB:", mongoose.connection.name);
});

// routes
app.use("/", authRoutes);

// Render requires dynamic port
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});