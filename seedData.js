const mongoose = require("mongoose");
const Event = require("./models/Event");
require("dotenv").config({ path: "./config.env" });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const sampleEvents = [
  {
    title: "Tech Conference 2024",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "Convention Center",
    description: "Annual technology conference featuring latest innovations",
    capacity: 500
  },
  {
    title: "Music Festival",
    date: "2024-04-20",
    time: "06:00 PM",
    location: "City Park",
    description: "Live music performances by local and international artists",
    capacity: 1000
  },
  {
    title: "Food Fair",
    date: "2024-05-10",
    time: "11:00 AM",
    location: "Downtown Square",
    description: "Taste delicious food from various cuisines",
    capacity: 300
  }
];

const seedDatabase = async () => {
  try {
    await Event.deleteMany({});
    await Event.insertMany(sampleEvents);
    console.log("Sample events added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();