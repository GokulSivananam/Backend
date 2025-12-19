const express = require("express");
const mongoose = require("mongoose");
const Event = require("./models/Event");
require("dotenv").config({ path: "./config.env" });

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected for test"))
  .catch(err => console.log("MongoDB error:", err));

app.post("/test-event", async (req, res) => {
  console.log("Test API called with:", req.body);
  try {
    const event = new Event({
      title: "API Test Event",
      date: "2024-12-20",
      time: "2:00 PM", 
      location: "Test Location",
      description: "Test from API",
      capacity: 50
    });
    const saved = await event.save();
    console.log("Saved:", saved);
    res.json({ success: true, data: saved });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Test server running on port 3001");
});