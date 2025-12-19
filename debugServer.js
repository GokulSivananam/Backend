const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Event = require("./models/Event");
require("dotenv").config({ path: "./config.env" });

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.post("/api/events", async (req, res) => {
  console.log("=== POST /api/events called ===");
  console.log("Request body:", req.body);
  console.log("Headers:", req.headers);
  
  try {
    const { title, date, time, location, description, capacity } = req.body;
    
    console.log("Extracted fields:", { title, date, time, location, description, capacity });
    
    const event = new Event({ title, date, time, location, description, capacity });
    console.log("Event object created:", event);
    
    const savedEvent = await event.save();
    console.log("Event saved successfully:", savedEvent);
    
    const count = await Event.countDocuments();
    console.log("Total events in DB now:", count);
    
    res.status(201).json({
      status: "success",
      data: savedEvent
    });
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
});

app.get("/api/events", async (req, res) => {
  console.log("=== GET /api/events called ===");
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    console.log("Found events:", events.length);
    res.status(200).json({
      status: "success",
      data: events
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Debug server running on port ${PORT}`);
  console.log("Waiting for requests...");
});