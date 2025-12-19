const mongoose = require("mongoose");
const Event = require("./models/Event");
require("dotenv").config({ path: "./config.env" });

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    const events = await Event.find();
    console.log("Events count:", events.length);
    console.log("Events:", events);
    process.exit(0);
  })
  .catch(err => {
    console.log("Error:", err.message);
    process.exit(1);
  });