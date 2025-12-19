const controller=require("../Controller/Controller.js");
const express=require("express");
const router=express.Router();

router.post("/register",controller.register);
router.post("/login",controller.login);
router.get("/events",controller.getAllEvents);
router.get("/events/:id",controller.getEventById);
router.post("/events",controller.createEvent);
router.put("/events/:id",controller.updateEvent);
router.delete("/events/:id",controller.deleteEvent);

module.exports = router;