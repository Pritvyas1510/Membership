import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    date: { type: String, required: true },
    time: { type: String, required: true },

    location: { type: String, required: true },
    organizedBy: { type: String, required: true },

    mediaUrl: { type: String, required: true },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", EventSchema);
