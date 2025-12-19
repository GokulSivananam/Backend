const controller=require("../Controller/Controller.js");
const { authenticate, requireAdmin } = require("../middleware/auth");
const express=require("express");
const router=express.Router();

router.post("/register",controller.register);
router.post("/login",controller.login);
router.get("/events", authenticate, controller.getAllEvents);
router.get("/events/:id", authenticate, controller.getEventById);
router.post("/events", authenticate, requireAdmin, controller.createEvent);
router.put("/events/:id", authenticate, requireAdmin, controller.updateEvent);
router.delete("/events/:id", authenticate, requireAdmin, controller.deleteEvent);

module.exports = router;