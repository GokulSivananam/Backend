const mongoose = require("mongoose");
const Event = require("./models/Event");
require("dotenv").config({ path: "./config.env" });

console.log("MongoDB URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✓ MongoDB connected successfully");
    console.log("✓ Database name:", mongoose.connection.db.databaseName);
    console.log("✓ Connection state:", mongoose.connection.readyState);
    
    // Test 1: Count existing events
    const count = await Event.countDocuments();
    console.log("\n✓ Current events in DB:", count);
    
    // Test 2: Create new event
    const testEvent = new Event({
      title: "Full Test Event",
      date: "2024-12-25",
      time: "3:00 PM",
      location: "Test Location",
      description: "Testing full connection",
      capacity: 200
    });
    
    const saved = await testEvent.save();
    console.log("\n✓ New event saved:", saved._id);
    
    // Test 3: Verify it was saved
    const newCount = await Event.countDocuments();
    console.log("✓ Total events now:", newCount);
    
    // Test 4: Fetch all events
    const allEvents = await Event.find();
    console.log("\n✓ All events:");
    allEvents.forEach(e => console.log(`  - ${e.title} (${e._id})`));
    
    console.log("\n✓✓✓ All tests passed! Database connection is working.");
    process.exit(0);
  })
  .catch(err => {
    console.error("✗ Error:", err.message);
    process.exit(1);
  });