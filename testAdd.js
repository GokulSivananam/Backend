const mongoose = require("mongoose");
const Event = require("./models/Event");
require("dotenv").config({ path: "./config.env" });

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    
    const testEvent = {
      title: "Test Event",
      date: "2024-12-20",
      time: "10:00 AM",
      location: "Test Location",
      description: "Test Description",
      capacity: 100
    };
    
    const event = new Event(testEvent);
    await event.save();
    console.log("Test event saved:", event);
    
    const allEvents = await Event.find();
    console.log("All events:", allEvents.length);
    
    process.exit(0);
  })
  .catch(err => {
    console.log("Error:", err.message);
    process.exit(1);
  });