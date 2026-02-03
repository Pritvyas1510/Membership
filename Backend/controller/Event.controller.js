import { Event } from "../model/Event.model.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, organizedBy } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image or video required" });
    }

    // ✅ SAFE MEDIA TYPE DETECTION
    const mediaType = req.file.mimetype.startsWith("video") ? "video" : "image";

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      organizedBy,
      mediaUrl: req.file.path,
      mediaType,
      createdBy: req.adminId,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, date, time, location, organizedBy } = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update text fields
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.organizedBy = organizedBy || event.organizedBy;

    // If new media uploaded
    if (req.file) {
      event.mediaUrl = req.file.path;
      event.mediaType = req.file.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    await event.save();

    res.json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
};
