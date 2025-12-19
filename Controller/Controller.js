const User = require("../models/User");
const Event = require("../models/Event");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: "error",
      message: "User already exists"
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.status(201).json({
    status: "success",
    token,
    data: { id: user._id, name, email }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      status: "error",
      message: "Invalid credentials"
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.status(200).json({
    status: "success",
    token,
    data: { id: user._id, name: user.name, email: user.email }
  });
};

exports.getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    data: events
  });
};

exports.getEventById = async (req, res) => {
  const id = req.params.id;
  const event = await Event.findById(id);
  if (!event) {
    return res.status(404).json({
      status: "Not Found",
      message: "Enter valid id"
    });
  }
  return res.status(200).json({
    status: "success",
    data: event
  });
};

exports.createEvent = async (req, res) => {
  const { title, date, time, location, description, capacity } = req.body;
  const event = new Event({ title, date, time, location, description, capacity });
  await event.save();
  res.status(201).json({
    status: "success",
    data: event
  });
};

exports.updateEvent = async (req, res) => {
  const id = req.params.id;
  const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
  if (!event) {
    return res.status(404).json({
      status: "Not Found",
      message: "Enter valid id"
    });
  }
  res.status(200).json({
    status: "success",
    data: event
  });
};

exports.deleteEvent = async (req, res) => {
  const id = req.params.id;
  const event = await Event.findByIdAndDelete(id);
  if (!event) {
    return res.status(404).json({
      status: "Not Found",
      message: "Enter valid id"
    });
  }
  res.status(200).json({
    status: "success",
    data: null
  });
};