import express from "express";
import upload from "../middleware/uploadEventMedia.js";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controller/Event.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { allowRoles } from "../middleware/checkRole.js";

const router = express.Router();

// CREATE EVENT
router.post(
  "/",
  adminAuth,
  allowRoles("admin"),
  upload.single("media"),
  createEvent
);

// GET ALL EVENTS
router.get("/", getEvents);

// UPDATE EVENT
router.put(
  "/:id",
  adminAuth,
  allowRoles("admin"),
  upload.single("media"),
  updateEvent
);

// DELETE EVENT
router.delete(
  "/:id",
  adminAuth,
  allowRoles("admin"),
  deleteEvent
);

export default router;
